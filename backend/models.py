from pydantic import BaseModel
from typing import List, Dict, Optional

########################
# Request Body Objects
########################


class User(BaseModel):
    id: str
    name: str
    budgets: Optional[List[str]] = []


class Rule(BaseModel):
    necessities: float
    desires: float
    savings: float


class BudgetItem(BaseModel):
    id: str
    name: str
    amount: float
    remarks: Optional[str]
    isCompleted: Optional[bool] = False


class Income(BaseModel):
    items: Optional[List[BudgetItem]] = []


class Necessity(BaseModel):
    items: Optional[List[BudgetItem]] = []


class Desire(BaseModel):
    items: Optional[List[BudgetItem]] = []


class Saving(BaseModel):
    items: Optional[List[BudgetItem]] = []


class BudgetDetail(BaseModel):
    id: str
    month: int
    year: int
    rule: Rule
    incomes: Optional[List[BudgetItem]] = []
    necessities: Optional[List[BudgetItem]] = []
    desires: Optional[List[BudgetItem]] = []
    savings: Optional[List[BudgetItem]] = []


class Budget(BaseModel):
    id: str
    month: int
    year: int
    rule: Rule
    incomes: Optional[List[str]] = []
    necessities: Optional[List[str]] = []
    desires: Optional[List[str]] = []
    savings: Optional[List[str]] = []


#########################
# Response Body Objects
#########################


class UserBudgetsResponse(BaseModel):
    budgets: List[BudgetDetail]


class UserBudgetIdsResponse(BaseModel):
    budgetIds: List[str]
    index: int              # Index for the latest budgetId

