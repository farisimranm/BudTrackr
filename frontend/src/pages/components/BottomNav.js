import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CalculateIcon from '@mui/icons-material/Calculate';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { GREY, WHITE, BUDTRACKR, ADD, DETAILS } from '../../utils/constants';

function BottomNav({ pageTitle, handleBottomNav }) {
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                sx={{ bgcolor: GREY }}
                value={pageTitle}
                onChange={handleBottomNav}
            >
                <BottomNavigationAction
                    icon={<HomeIcon />}
                    value={BUDTRACKR}
                    sx={{ color: pageTitle === BUDTRACKR ? 'primary.main' : WHITE }}
                />
                <BottomNavigationAction
                    icon={<AddCircleIcon />}
                    value={ADD}
                    sx={{ color: pageTitle === ADD ? 'primary.main' : WHITE }}
                />
                <BottomNavigationAction
                    icon={<CalculateIcon />}
                    value={DETAILS}
                    sx={{ color: pageTitle === DETAILS ? 'primary.main' : WHITE }}
                />
            </BottomNavigation>
        </Paper>
    );
}

export default BottomNav;