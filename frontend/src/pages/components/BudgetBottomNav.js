import React from "react";
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function BudgetBottomNav({ budgetIdsObj, setIndex }) {
  const budgetsLength = budgetIdsObj?.budgetIds.length - 1;
  let index = budgetIdsObj?.index;

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, width: '100%' }} elevation={3}>
      <BottomNavigation >
        <BottomNavigationAction 
          icon={<ArrowBackIcon />} 
          onClick={() => setIndex(index - 1)}
          disabled={index === 0}
        />
        <BottomNavigationAction 
          icon={<AddCircleIcon />} 
          onClick={() => console.log("Add button")} 
        />
        <BottomNavigationAction 
          icon={<ArrowForwardIcon 
          onClick={() => setIndex(index + 1)} />} 
          disabled={ index === budgetsLength }
        />
      </BottomNavigation>
    </Paper>
  );
}

export default BudgetBottomNav;