import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Typography, Container } from '@mui/material';
import { v1_user_userId } from "../utils/backendUtil";

function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(v1_user_userId("usr-7"));
            setUser(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Container>
            <Typography variant="h3" component="h3">
                Dashboard
            </Typography>
            {
                user.id
            }
        </Container>
    );
}

export default Dashboard;