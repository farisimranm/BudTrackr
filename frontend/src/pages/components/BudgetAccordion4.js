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
import { DataGrid } from '@mui/x-data-grid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { roundDecimal } from '../../utils/mathUtil';

function BudgetAccordion4({ title, initialAmount }) {
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
                            <AddCircleIcon sx={{ mr: 1 }} />
                            <Typography color="textSecondary">
                                Add Item
                            </Typography>
                        </IconButton>
                    </Box>
                    <Box>
                        <DataGridDemo />
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Paper>
    );
}

export default BudgetAccordion4;

const columns = [
    {
        field: 'name',
        headerName: 'Name',
        type: 'string',
        width: 150,
        editable: true
    },
    {
        field: 'amount',
        headerName: 'Amount (RM)',
        type: 'number',
        width: 110,
        editable: true
    },
    {
        field: 'remarks',
        headerName: 'Remarks',
        type: 'string',
        width: 150,
        editable: true
    },
    {
        field: 'Completed',
        headerName: 'completed',
        type: 'boolean',
        width: 160,
        editable: true
    },
];

const rows = [
    { id: 1, name: 'Solat', remarks: '', amount: 5, completed: false },
    { id: 2, name: 'Coding', remarks: '', amount: 24, completed: true },
    { id: 3, name: 'Pay bills', remarks: 'Maxis', amount: 420.69, completed: false }
];
  
function DataGridDemo() {
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}