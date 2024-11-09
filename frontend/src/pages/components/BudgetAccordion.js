import React, { useEffect, useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import BudgetDataGrid from "./BudgetDataGrid";

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

function BudgetAccordion({ mode, allocation, budgetElement }) {
    const [bmItem, setBmItem] = useState(null);

    useEffect(() => {
        const prepareMode = () => {
            if (mode) {
                if (typeof mode === "string") {
                    switch (mode) {
                        case "income":
                            setBmItem(budgetElementsMap.income);
                            break;
                        case "necessity":
                            setBmItem(budgetElementsMap.necessity);
                            break;
                        case "desire":
                            setBmItem(budgetElementsMap.desire);
                            break;
                        case "saving":
                            setBmItem(budgetElementsMap.saving);
                            break;
                        default:
                            break;
                    }
                }
            }
        };

        prepareMode();

    }, [mode]);

    const getDisplayAmount = () => {
        let totalAmount = 0;

        if (!budgetElement)
            return `RM${totalAmount}`;

        for (let item of budgetElement) {
            totalAmount += item?.amount;
        }

        if (mode) {
            if (mode === "income") {
                return `RM${totalAmount}`
            }
        }
        
        return `RM${totalAmount} / RM${allocation}`;
    };

    return (
        <div>
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ width: '100%' }}
                    >
                        <Typography variant="h5">{bmItem?.title}</Typography>
                        <Typography variant="h5">{getDisplayAmount()}</Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <BudgetDataGrid mode={mode} budgetElement={budgetElement} />
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default BudgetAccordion;