import React from "react";
import { Typography, Box, Paper } from '@mui/material';
import { WHITE, GREY } from "../utils/constants";
import { getFormattedDate } from "../utils/dateUtil";

const widgetSx = { my: 10, py: 1, bgcolor: GREY };
const textSx = { pl: 1, color: WHITE, textAlign: "center" };

function Home() {
    const formattedDate = getFormattedDate();

    return (
        <Box sx={{ py: 1 }}>
            <Box>
                <Typography variant="h6" sx={textSx}>
                    {formattedDate}
                </Typography>
            </Box>
            <Paper sx={widgetSx}>
                <Typography variant="h5" sx={textSx}>
                    Spending Balance
                </Typography>
                <Typography variant="h4" sx={textSx}>
                    RM 1000
                </Typography>
            </Paper>
            <Paper sx={widgetSx}>
                <Typography variant="h5" sx={textSx}>
                    Today's Allocation
                </Typography>
                <Typography variant="h4" sx={textSx}>
                    RM 200
                </Typography>
                <Typography variant="subtitle2" sx={textSx}>
                    RM 300/500 used
                </Typography>
            </Paper>
            <Paper sx={widgetSx}>
                <Typography variant="h5" sx={textSx}>
                    Days Until Payday
                </Typography>
                <Typography variant="h4" sx={textSx}>
                    1 Day(s)
                </Typography>
                <Typography variant="subtitle2" sx={textSx}>
                    Tuesday, 26 November
                </Typography>
            </Paper>
        </Box>
    );
}

export default Home;