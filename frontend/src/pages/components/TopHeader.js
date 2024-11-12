import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { GREY, WHITE, BUDTRACKR } from '../../utils/constants';

function TopHeader({ pageTitle }) {

    if (pageTitle === BUDTRACKR) {
        return (
            <AppBar
                position="static"
                sx={{ bgcolor: GREY }}
            >
                <Toolbar>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 0.5,
                            width: '100%'
                        }}
                    >
                        <Box
                            component="img"
                            alt="BudTrackr Logo"
                            src="/logo192.png"
                            sx={{ height: '40px' }}
                        />
                        <Typography
                            variant="h5"
                            sx={{ color: WHITE }}
                        >
                            {pageTitle}
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
        );
    }
    else {
        return (
            <AppBar
                position="static"
                sx={{ bgcolor: GREY }}
            >
                <Toolbar>
                    <Typography
                        variant="h5"
                        sx={{
                            flexGrow: 1,
                            textAlign: "center",
                            color: WHITE
                        }}
                    >
                        {pageTitle}
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default TopHeader;