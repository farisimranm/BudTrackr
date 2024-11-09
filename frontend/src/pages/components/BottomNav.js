import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { GREY, WHITE, HOME, ADD, DETAILS } from '../../utils/constants';

function BottomNav({ pageTitle, handleBottomNav }) {
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                sx={{ bgcolor: GREY }}
                value={pageTitle}
                onChange={handleBottomNav}
            >
                <BottomNavigationAction
                    icon={<HomeIcon sx={{ color: WHITE }} />}
                    value={HOME}
                />
                <BottomNavigationAction
                    icon={<AddCircleIcon sx={{ color: WHITE }} />}
                    value={ADD}
                />
                <BottomNavigationAction
                    icon={<AttachMoneyIcon sx={{ color: WHITE }} />}
                    value={DETAILS}
                />
            </BottomNavigation>
        </Paper>
    );
}

export default BottomNav;