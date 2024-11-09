import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { BLACK, HOME, ADD, DETAILS, root, home, new_budget, details } from '../../utils/constants';
import BottomNav from './BottomNav';
import TopHeader from './TopHeader';

function BaseLayout() {
    const [pageTitle, setPageTitle] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;

        switch (path) {
            case new_budget:
                setPageTitle(ADD);
                break;
            case details:
                setPageTitle(DETAILS);
                break;
            case home:
            case root:
            default:
                setPageTitle(HOME);
                break;
        }
    }, [location.pathname]);

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
                sx={{ pb: 7, flexGrow: 1, overflowY: 'auto' }}>
                <Outlet />
            </Container>
            <BottomNav pageTitle={pageTitle} handleBottomNav={handleBottomNav} />
        </Box>
    );
}

export default BaseLayout;