import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import App from './App';
import Login from './Login';
import SignUp from './SignUp';


function HomePageWrapper() {
    const navigate = useNavigate();
    
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.token);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
    };


    return (
        <div>
            <button onClick={()=>navigate('/signup')}>Sign Up</button>
            <button onClick={()=>navigate('/login')}>Login</button>
        </div>
    );
}

export default HomePageWrapper;
