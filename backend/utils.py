from db import is_connected, budget_collection, income_collection, necessity_collection, desire_collection, saving_collection
import logging
from models import *
from constants import *
from datetime import datetime
from fastapi import HTTPException, status

def setup_logging():
    # Logging configurations
    current_date = datetime.now().strftime("%Y%m%d")
    logging.basicConfig(filename=f'./log/budtrackr-backend-{current_date}.log', level=logging.DEBUG, format='%(asctime)s %(levelname)s %(message)s')


setup_logging()


def check_connection():
    if not is_connected:
        logging.error("Database is not connected")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error")


def process_id(obj):
    obj["_id"] = str(obj["_id"])
    return obj


def is_blank(s):
    return not s.strip()


# Get BudgetDetail object based on given budgetId
def get_BudgetDetail(budget_id: str):
    budget = budget_collection.find_one({ID: budget_id})

    if not budget:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Budget not found")

    response = budget

    # Process incomes
    incomes = budget[INCOMES]

    if not incomes:
        budget[INCOMES] = []

    resp_incomes = []
    for income_id in incomes:
        income = income_collection.find_one({ID: income_id})

        if not income:
            logging.warning(f"Income \"{income_id}\" is not found inside Budget \"{budget_id}\". Skipping record...")
            continue
        
        resp_incomes.append(process_id(income))

    # Process necessities
    necessities = budget[NECESSITIES]

    if not necessities:
        budget[NECESSITIES] = []

    resp_necessities = []
    for necessity_id in necessities:
        necessity = necessity_collection.find_one({ID: necessity_id})

        if not necessity:
            logging.warning(f"Necessity \"{necessity_id}\" is not found inside Budget \"{budget_id}\". Skipping record...")
            continue
        
        resp_necessities.append(process_id(necessity))

    # Process desires
    desires = budget[DESIRES]

    if not desires:
        budget[DESIRES] = []

    resp_desires = []
    for desire_id in desires:
        desire = desire_collection.find_one({ID: desire_id})

        if not desire:
            logging.warning(f"Desire \"{desire_id}\" is not found inside Budget \"{budget_id}\". Skipping record...")
            continue
        
        resp_desires.append(process_id(desire))

    # Process savings
    savings = budget[SAVINGS]

    if not savings:
        budget[SAVINGS] = []

    resp_savings = []
    for saving_id in savings:
        saving = saving_collection.find_one({ID: saving_id})

        if not saving:
            logging.warning(f"Saving \"{saving_id}\" is not found inside Budget \"{budget_id}\". Skipping record...")
            continue
        
        resp_savings.append(process_id(saving))

    response[INCOMES] = resp_incomes
    response[NECESSITIES] = resp_necessities
    response[DESIRES] = resp_desires
    response[SAVINGS] = resp_savings

    return response