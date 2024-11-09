import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { GREY, WHITE } from '../../utils/constants';

function TopHeader({ pageTitle }) {

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

export default TopHeader;