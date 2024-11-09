import React, { useState } from "react";
import { Typography, Container, Box, TextField, MenuItem } from '@mui/material';
import { months } from "../utils/dateUtil";

function NewBudget() {
    const [month, setMonth] = useState(7);

    return (
        <Container>
            <Box>
                <Typography variant="h3" component="h3">
                    Add New Budget
                </Typography>
            </Box>
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Month"
                    defaultValue={month}
                    helperText="Please select your month"
                >
                    {months.map((option) => (
                        <MenuItem key={option.key} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>
        </Container>
    );
}

export default NewBudget;