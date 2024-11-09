import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Typography, Paper, Box } from '@mui/material';
import { v1_user_userId_budgetIds, v1_budget_budgetId } from "../utils/backendUtil";
import { getMonthName } from "../utils/dateUtil";
import BudgetAccordion from "./components/BudgetAccordion";
import { calculateAllocation } from "../utils/mathUtil";
import BudgetBottomNav from "./components/BudgetBottomNav";
import { WHITE, INCOMES, NECESSITIES, DESIRES, SAVINGS } from "../utils/constants";
import RuleSection from "./components/RuleSection";

function BudgetDetails() {
    const [budgetIdsObj, setBudgetIdsObj] = useState(null);
    const [budget, setBudget] = useState(null);
    const [ruleData, setRuleData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const user_id = "usr-7";
    const NA = "N/A";

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
                setRuleData(getRuleData());
            }
        };

        fetchBudgetDetails();
    }, [budgetIdsObj]);

    useEffect(() => {
        setRuleData(getRuleData());
    }, [budget]);

    const setIndex = (index) => {
        const budgetsLength = budgetIdsObj?.budgetIds.length - 1;

        if (index < budgetsLength || index > budgetsLength) {
            console.log(`Reached the edge with index: ${index}`);
            return;
        }

        setBudgetIdsObj({
            ...budgetIdsObj,
            index
        });
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

    const setBudgetElement = (itemType, budgetElement) => {
        console.log('itemType', itemType);
        console.log('budgetElement', budgetElement);
        setBudget({
            ...budget,
            [itemType]: budgetElement
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Box sx={{ py: 1 }}>
            <Box>
                <Typography variant="h6" sx={{ pl: 1, color: WHITE }}>
                    Budget for {getMonthName(budget?.month) || NA} {budget?.year || NA}
                </Typography>
            </Box>
            <RuleSection ruleData={ruleData} setRuleData={setRuleData} />
            <Paper className="budgetIncome" sx={{ backgroundColor: "lightsalmon" }}>
                <BudgetAccordion
                    itemType={INCOMES}
                    initialBudgetElement={budget?.incomes}
                    setBudgetElement={setBudgetElement}
                />
            </Paper>
            <Paper className="budgetNecessity" sx={{ backgroundColor: "lightsalmon" }}>
                <BudgetAccordion
                    itemType={NECESSITIES}
                    allocation={ruleData?.necessities?.amount}
                    initialBudgetElement={budget?.necessities}
                    setBudgetElement={setBudgetElement}
                />
            </Paper>
            <Paper className="budgetDesire" sx={{ backgroundColor: "lightsalmon" }}>
                <BudgetAccordion
                    itemType={DESIRES}
                    allocation={ruleData?.desires?.amount}
                    initialBudgetElement={budget?.desires}
                    setBudgetElement={setBudgetElement}
                />
            </Paper>
            <Paper className="budgetSaving" sx={{ backgroundColor: "lightsalmon", marginBottom: "100" }}>
                <BudgetAccordion
                    itemType={SAVINGS}
                    allocation={ruleData?.savings?.amount}
                    initialBudgetElement={budget?.savings}
                    setBudgetElement={setBudgetElement}
                />
            </Paper>
            <BudgetBottomNav
                budgetIdsObj={budgetIdsObj}
                setIndex={setIndex}
            />
        </Box>
    );
}

export default BudgetDetails;