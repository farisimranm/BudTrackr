import React, { useEffect, useState } from 'react';
import { Box, IconButton, Typography, Dialog, DialogTitle, MenuItem, Select } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import dayjs from 'dayjs';
import { WHITE, GREY } from '../../utils/constants';
import { getDayjsDate } from '../../utils/dateUtil';

function MonthPicker({ month, year, budgetIdsObj, setIndex }) {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [open, setOpen] = useState(false);

    useEffect(() => {
            setSelectedDate(getDayjsDate(month, year));
    }, [month, year]);

    const isIndexValid = (index) => {
        const budgetsLength = budgetIdsObj?.budgetIds?.length ?? 0;
        return index >= 0 && index < budgetsLength;
    };

    const handlePrevMonth = () => {
        setSelectedDate(prevDate => prevDate.subtract(1, 'month'));
        setIndex(budgetIdsObj?.index - 1);
    };

    const handleNextMonth = () => {
        setSelectedDate(prevDate => prevDate.add(1, 'month'));
        setIndex(budgetIdsObj?.index + 1);
    };

    const handleMonthClick = () => {
        setOpen(true);
    };

    const handleMonthChange = (event) => {
        setSelectedDate(dayjs().set('month', event.target.value).set('year', selectedDate.year()));
    };

    const handleYearChange = (event) => {
        setSelectedDate(dayjs().set('year', event.target.value).set('month', selectedDate.month()));
    };

    return (
        <Box display="flex" alignItems="center" justifyContent="center">
            <IconButton 
                onClick={handlePrevMonth}
                disabled={!isIndexValid(budgetIdsObj?.index - 1)}
            >
                <ArrowBackIosIcon 
                    sx={{ color: isIndexValid(budgetIdsObj?.index - 1) ? WHITE : GREY }}
                />
            </IconButton>
            
            <Typography 
                variant="h6" 
                onClick={handleMonthClick} 
                sx={{ 
                    color: WHITE, 
                    cursor: 'pointer', 
                    width: 160, 
                    textAlign: 'center'
                }}
            >
                {selectedDate.format('MMMM YYYY')}
            </Typography>
            
            <IconButton 
                onClick={handleNextMonth}
                disabled={!isIndexValid(budgetIdsObj?.index + 1)}
            >
                <ArrowForwardIosIcon 
                    sx={{ color: isIndexValid(budgetIdsObj?.index + 1) ? WHITE : GREY }}
                />
            </IconButton>

            {/* Month Picker Modal */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Select Month and Year</DialogTitle>
                <Box p={3} display="flex" gap={2}>
                    <Select
                        value={selectedDate.month()}
                        onChange={handleMonthChange}
                    >
                        {Array.from({ length: 12 }).map((_, idx) => (
                            <MenuItem key={idx} value={idx}>
                                {dayjs().month(idx).format('MMMM')}
                            </MenuItem>
                        ))}
                    </Select>
                    <Select
                        value={selectedDate.year()}
                        onChange={handleYearChange}
                    >
                        {/* Generate years dynamically */}
                        {Array.from({ length: 10 }, (_, i) => (
                            <MenuItem key={i} value={dayjs().year() - 5 + i}>
                                {dayjs().year() - 5 + i}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
            </Dialog>
        </Box>
    );
}

export default MonthPicker;
