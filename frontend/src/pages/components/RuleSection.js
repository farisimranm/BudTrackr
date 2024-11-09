import React, { } from 'react';
import { Box, TextField, Grid2, Typography, Paper } from '@mui/material';
import { BLANK, WHITE } from '../../utils/constants';
import { calculateAllocation } from '../../utils/mathUtil';
import { capitalize } from '../../utils/StringUtil';

function RuleSection({ ruleData, setRuleData }) {
    const NECESSITIES = "necessities";
    const DESIRES = "desires";
    const SAVINGS = "savings";

    const handleInputChange = (section, percentage) => {
        setRuleData({
            ...ruleData,
            [section]: {
                percentage,
                amount: calculateAllocation(ruleData?.income, percentage)
            }
        });
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ color: WHITE }}>
                Rule
            </Typography>
            <Paper sx={{ padding: 3 }}>
                <Grid2 container spacing={3}>
                    <RuleItem itemType={NECESSITIES} ruleData={ruleData} handleInputChange={handleInputChange} />
                    <RuleItem itemType={DESIRES} ruleData={ruleData} handleInputChange={handleInputChange} />
                    <RuleItem itemType={SAVINGS} ruleData={ruleData} handleInputChange={handleInputChange} />
                </Grid2>
            </Paper>
        </Box>
    );
}

export default RuleSection;

function RuleItem({ itemType, ruleData, handleInputChange }) {
    const AMOUNT_LABEL = "Amount (RM)";
    const PERCENTAGE_LABEL = "Percentage";

    return (
        <Grid2 xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 1 }}>{capitalize(itemType)}</Typography>
            <TextField
                label={PERCENTAGE_LABEL}
                type="number"
                value={ruleData?.[itemType]?.percentage ?? BLANK}
                onChange={(e) => handleInputChange(itemType, e.target.value)}
                fullWidth
                sx={{ marginBottom: 1 }}
            />
            <TextField
                label={AMOUNT_LABEL}
                type="number"
                value={ruleData?.[itemType]?.amount}
                fullWidth
                slotProps={{ input: { readOnly: true } }}
            />
        </Grid2>
    );
}