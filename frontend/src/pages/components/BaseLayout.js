import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { BLACK, HOME, ADD, DETAILS, root, new_budget, details } from '../../utils/constants';
import BottomNav from './BottomNav';
import TopHeader from './TopHeader';

function BaseLayout() {
    const [pageTitle, setPageTitle] = useState(HOME);
    const navigate = useNavigate();

    const handleBottomNav = (e, pageTitle) => {
        setPageTitle(pageTitle);

        switch (pageTitle) {
            case ADD:
                navigate(new_budget);
                break;
            case DETAILS:
                navigate(details);
                break;
            case HOME:
            default:
                navigate(root);
                break;
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                bgcolor: BLACK,
            }}
        >
            <TopHeader pageTitle={pageTitle} />
            <Container 
                maxWidth="lg" 
                sx={{ flexGrow: 1, overflowY: 'auto' }}>
                <Outlet />
            </Container>
            <BottomNav pageTitle={pageTitle} handleBottomNav={handleBottomNav} />
        </Box>

    );
}

export default BaseLayout;