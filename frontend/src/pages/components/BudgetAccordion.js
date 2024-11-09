import React, { useEffect, useState } from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Paper,
    IconButton,
    Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BudgetDataGrid from "./BudgetDataGrid";
import { INCOMES, NECESSITIES, DESIRES, SAVINGS } from "../../utils/constants";

const budgetElementsMap = {
    income: {
        single: "income",
        plural: "incomes",
        title: "Incomes"
    },
    necessity: {
        single: "necessity",
        plural: "necessities",
        title: "Necessities"
    },
    desire: {
        single: "desire",
        plural: "desires",
        title: "Desires"
    },
    saving: {
        single: "saving",
        plural: "savings",
        title: "Savings"
    }
}

function BudgetAccordion({ itemType, allocation, initialBudgetElement, setBudgetElement }) {
    const [bmItem, setBmItem] = useState(null);
    const [budgetList, setBudgetList] = useState(initialBudgetElement);

    const emptyItem = { name: '', amount: 0, remarks: null, isCompleted: false };

    useEffect(() => {
        const prepareMode = () => {
            if (itemType) {
                if (typeof itemType === "string") {
                    switch (itemType) {
                        case INCOMES:
                            setBmItem(budgetElementsMap.income);
                            break;
                        case NECESSITIES:
                            setBmItem(budgetElementsMap.necessity);
                            break;
                        case DESIRES:
                            setBmItem(budgetElementsMap.desire);
                            break;
                        case SAVINGS:
                            setBmItem(budgetElementsMap.saving);
                            break;
                        default:
                            break;
                    }
                }
            }
        };

        prepareMode();
    }, [itemType]);

    useEffect(() => {
        setBudgetList(initialBudgetElement);
    }, [initialBudgetElement]);

    const getDisplayAmount = () => {
        let totalAmount = 0;

        if (!initialBudgetElement)
            return `RM${totalAmount}`;

        for (let item of initialBudgetElement) {
            totalAmount += item?.amount;
        }

        if (itemType) {
            if (itemType === INCOMES) {
                return `RM${totalAmount}`
            }
        }

        return `RM${totalAmount} / RM${allocation}`;
    };

    const addItem = () => {
        const budgetElementLength = budgetList.length;
        let newBudgetList = [
            ...budgetList,
            { id: budgetElementLength, ...emptyItem }
        ]
        setBudgetElement(itemType, newBudgetList);
    };

    return (
        <Paper sx={{ mb: 2 }}>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Typography variant="h6" sx={{ mr: 0.5 }}>{bmItem?.title}</Typography>
                        <Typography variant='subtitle2' color="textSecondary">{getDisplayAmount()}</Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <BudgetDataGrid mode={itemType} budgetElement={budgetList} />
                    <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <IconButton onClick={addItem}>
                            <AddCircleIcon sx={{ mr: 1 }} />
                            <Typography color="textSecondary">
                                Add Item
                            </Typography>
                        </IconButton>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Paper>
    );
}

export default BudgetAccordion;