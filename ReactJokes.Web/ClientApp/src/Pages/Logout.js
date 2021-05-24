import React, { useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../AuthContext';
import { useHistory } from 'react-router';


const Logout = () => {

    const { logout } = useAuthContext();
    const history = useHistory();

    useEffect(() => {
        const logoutUser = () => {
            axios.post('/api/account/logout');
            logout();
        };
        logoutUser();
        history.push('/login');
    });

    return (
        <></>
    );
};

export default Logout;