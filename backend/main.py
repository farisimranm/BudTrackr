from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, status
from models import *
from db import user_collection, budget_collection
import logging
from datetime import date
from constants import *
from utils import *

setup_logging()

app = FastAPI()

origins = [
    "http://localhost:3000"  # React frontend dev server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # Allow specific origins
    allow_credentials=True,
    allow_methods=["*"],              # Allow all HTTP methods
    allow_headers=["*"],              # Allow all headers
)


@app.get("/")
def home():
    return "BudTrackr Home"


@app.get("/budtrackr/v1/user/{user_id}", response_model=User)
def get_user(user_id: str):
    check_connection()

    user = user_collection.find_one({ ID: user_id })

    if user:
        return process_id(user)
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User not found")


@app.get("/budtrackr/v1/user/{user_id}/budgets", response_model=UserBudgetsResponse)
def get_user_budgets(user_id: str):
    check_connection()

    response = {
        BUDGETS: []
    }

    user = user_collection.find_one({ ID: user_id })
    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User not found")

    budgets = user[BUDGETS]
    if not budgets:
        return response

    # Preparing response
    resp_budgets = []
    for budgetId in budgets:
        if is_blank(budgetId):
            logging.warning("Record does not contain budgetId. Skipping record...")
            continue
        
        result = budget_collection.find_one({ID: budgetId})

        if not result:
            logging.warning(f'Cannot find budgetId "{budgetId}" from user.budgets inside BUDGET collection. Skipping record...')

        

        resp_budgets.append(process_id(result))
    
    response[BUDGETS] = resp_budgets

    return response

# Get list of budgetIds for the user with the index of closest budgetId to today
@app.get("/budtrackr/v1/user/{user_id}/budgetIds", response_model=UserBudgetIdsResponse)
def get_user_budgetIds(user_id: str):
    check_connection()

    # Define response body object
    response = {
        BUDGET_IDS: [],
        INDEX: 0
    }

    user = user_collection.find_one({ ID: user_id })
    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User not found")

    budgets = user[BUDGETS]
    if not budgets:
        return response
    
    budget_list = []
    for budgetId in budgets:
        if not budgetId:
            logging.warning("Record does not contain budgetId. Skipping record...")
            continue
        
        # Get the month and year for current budgetId
        b = budget_collection.find_one(
            { ID: budgetId },
            { ID: 1, MONTH: 1, YEAR: 1 }
        )
        budget_month = b[MONTH]
        budget_year = b[YEAR]

        if not budget_month and not budget_year:
            logging.warning("Record does not contain month and/or year. Skipping record...")
            continue

        budget_list.append(b)
    
    # Sorting the budget list by year and month in ascending order
    budget_list.sort(key=lambda x: (x[YEAR], x[MONTH]))

    # Finding budget with current month and current year
    # Explanation:
    #   1. Get today's year and month
    #   2. Use next() to find the first occurence of object
    #   3. Use enumerate() with [::-1] to loop through the list in reverse order while keeping the original indices
    #   4. Find a budget that has year and month equal to or less than today's
    #   5. If not found, return the budget at index 0
    today = date.today()
    year = today.year
    month = today.month
    index, budget = next(
        (
            (i, b)
            for i, b in enumerate(budget_list[::-1])
            if b[YEAR] <= year and b[MONTH] <= month
        ),
        (0, budget_list[0])
    )

    # Reversing the index
    last_index = len(budget_list) - 1
    index = last_index - index

    logging.info(f"Today: year={year}, month={month}")
    logging.info(f'Budget with closest date to today: budget={budget}, index={index}')

    resp_budgetIds = []
    for budget in budget_list:
        resp_budgetIds.append(budget[ID])

    response[BUDGET_IDS] = resp_budgetIds
    response[INDEX] = index

    return response


@app.get("/budtrackr/v1/budget/{budget_id}", response_model=BudgetDetail)
def get_budget(budget_id: str):
    check_connection()

    resp_budget = get_BudgetDetail(budget_id=budget_id)

    return process_id(resp_budget)


@app.post("/budtrackr/v1/user/create")
def create_user(user: User):
    check_connection()

    return user
