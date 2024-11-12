import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Box, Button } from '@mui/material';
import { v1_user_userId_budgetIds, v1_budget_budgetId } from "../utils/backendUtil";
import BudgetAccordion from "./components/BudgetAccordion";
import { calculateAllocation } from "../utils/mathUtil";
import { INCOMES, NECESSITIES, DESIRES, SAVINGS } from "../utils/constants";
import RuleSection from "./components/RuleSection";
import MonthPicker from "./components/MonthPicker";

// TODO: check if the budget is edited before showing save button
function BudgetDetails() {
    const [budgetIdsObj, setBudgetIdsObj] = useState(null);
    const [budget, setBudget] = useState(null);
    const [ruleData, setRuleData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const user_id = "usr-7";

    // Initial user's budgetIds fetch
    useEffect(() => {
        const fetchUserBudgets = async () => {
            try {
                console.log(`Fetching budgets for User ID: ${user_id}`);
                const response = await axios.get(v1_user_userId_budgetIds(user_id));
                const data = response.data;
                setBudgetIdsObj(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserBudgets();
    }, [user_id]);

    // Fetch budget details based on index
    useEffect(() => {
        const fetchBudgetDetails = async () => {
            const index = budgetIdsObj?.index;
            const budget_id = budgetIdsObj?.budgetIds?.[index];
            try {
                if (budget_id) {
                    console.log(`Fetching budget details for Budget ID: ${budget_id}`);
                    const response = await axios.get(v1_budget_budgetId(budget_id));
                    const data = response.data;
                    setBudget(data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBudgetDetails();
    }, [budgetIdsObj]);

    useEffect(() => {
        const calculateIncome = () => {
            const incomes = budget?.incomes;

            if (!incomes)
                return null;

            let totalAmount = 0;
            for (let income of incomes) {
                totalAmount += income?.amount;
            }

            return totalAmount;
        };

        const getRuleData = () => {
            const income = calculateIncome();
            const nPercentage = budget?.rule?.necessities;
            const dPercentage = budget?.rule?.desires;
            const sPercentage = budget?.rule?.savings;

            let ruleData = {
                income,
                necessities: {
                    percentage: nPercentage,
                    amount: calculateAllocation(income, nPercentage)
                },
                desires: {
                    percentage: dPercentage,
                    amount: calculateAllocation(income, dPercentage)
                },
                savings: {
                    percentage: sPercentage,
                    amount: calculateAllocation(income, sPercentage)
                }
            }

            return ruleData;
        };

        setRuleData(getRuleData());
    }, [budget]);

    const setIndex = (index) => {
        setBudgetIdsObj({
            ...budgetIdsObj,
            index: index
        });
    };

    const setBudgetElement = (itemType, budgetElement) => {
        setBudget({
            ...budget,
            [itemType]: budgetElement
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Box sx={{ py: 1 }}>
            <MonthPicker
                month={budget?.month}
                year={budget?.year}
                budgetIdsObj={budgetIdsObj}
                setIndex={setIndex}
            />
            <RuleSection ruleData={ruleData} setRuleData={setRuleData} />
            <BudgetAccordion
                itemType={INCOMES}
                initialBudgetElement={budget?.incomes}
                setBudgetElement={setBudgetElement}
            />
            <BudgetAccordion
                itemType={NECESSITIES}
                allocation={ruleData?.necessities?.amount}
                initialBudgetElement={budget?.necessities}
                setBudgetElement={setBudgetElement}
            />
            <BudgetAccordion
                itemType={DESIRES}
                allocation={ruleData?.desires?.amount}
                initialBudgetElement={budget?.desires}
                setBudgetElement={setBudgetElement}
            />
            <BudgetAccordion
                sx={{ marginBottom: "100" }}
                itemType={SAVINGS}
                allocation={ruleData?.savings?.amount}
                initialBudgetElement={budget?.savings}
                setBudgetElement={setBudgetElement}
            />
            {
                // Check if edited before showing save button
                true &&
                <Button
                    sx={{ width: "100%" }}
                    variant="contained"
                >
                    Save Changes
                </Button>
            }
        </Box>
    );
}

export default BudgetDetails;