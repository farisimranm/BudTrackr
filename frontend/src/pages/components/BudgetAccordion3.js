import React, { useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    TextField,
    Checkbox,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { roundDecimal } from '../../utils/mathUtil';

function BudgetAccordion3({ title, initialAmount }) {
    const emptyItem = { name: '', amount: '', remarks: '', completed: false };

    const [items, setItems] = useState([
        emptyItem,
    ]);
    const [totalAmount, setTotalAmount] = useState(initialAmount);

    // Handler for updating individual fields in the item list
    const handleItemChange = (index, field, value) => {
        const updatedItems = items.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        setItems(updatedItems);
        calculateTotalAmount(updatedItems);
    };

    // Handler to add a new item
    const addItem = () => {
        setItems([...items, emptyItem]);
    };

    // Calculate the total amount
    const calculateTotalAmount = (updatedItems) => {
        const total = updatedItems.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
        setTotalAmount(total);
    };

    return (
        <Paper sx={{ mb: 2 }}>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <Typography variant="h6" sx={{ mr: 0.5 }}>{title}</Typography>
                    <Typography variant='subtitle2' color="textSecondary">RM{totalAmount}</Typography>
                </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Amount (RM)</TableCell>
                                    <TableCell>Remarks</TableCell>
                                    <TableCell>Completed</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <TextField
                                                variant="standard"
                                                value={item.name}
                                                onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                                                fullWidth
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                variant="standard"
                                                type="number"
                                                value={item.amount}
                                                onChange={(e) => handleItemChange(index, 'amount', parseFloat(e.target.value))}
                                                fullWidth
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                variant="standard"
                                                value={item.remarks}
                                                onChange={(e) => handleItemChange(index, 'remarks', e.target.value)}
                                                fullWidth
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Checkbox
                                                checked={item.completed}
                                                onChange={(e) => handleItemChange(index, 'completed', e.target.checked)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {/* Total amount row */}
                                <TableRow>
                                    <TableCell colSpan={3} align="right">
                                        <Typography variant="subtitle1" color="textSecondary">
                                            Total Amount:
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Typography variant="subtitle1" color="textSecondary">
                                            RM{roundDecimal(totalAmount)}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <IconButton onClick={addItem}>
                            <AddCircleIcon sx={{ mr: 1 }}/>
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

export default BudgetAccordion3;
