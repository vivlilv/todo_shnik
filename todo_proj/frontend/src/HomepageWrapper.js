import React, { useState } from 'react';
import App from './App';
import Login from './Login';

function HomePageWrapper() {
    console.log(localStorage.token)
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.token);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <div>
            {isLoggedIn ? (
                <App onLogout={handleLogout} />
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </div>
    );
}

export default HomePageWrapper;
