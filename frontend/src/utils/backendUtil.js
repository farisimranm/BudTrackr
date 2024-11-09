const BASE_URI = process.env.REACT_APP_BACKEND_URL;
export const v1_user_userId = (user_id) => { return BASE_URI + `/budtrackr/v1/user/${user_id}`};
export const v1_user_userId_budgets = (user_id) => { return BASE_URI + `/budtrackr/v1/user/${user_id}/budgets`};
export const v1_budget_budgetId = (budget_id) => { return BASE_URI + `/budtrackr/v1/budget/${budget_id}`};
export const v1_user_userId_budgetIds = (user_id) => { return BASE_URI + `/budtrackr/v1/user/${user_id}/budgetIds`};
