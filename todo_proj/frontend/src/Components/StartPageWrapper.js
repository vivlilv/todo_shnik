import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';


function HomePageWrapper() {
    const navigate = useNavigate();

    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
        navigate('/home');
        }
    }, [token, navigate]);




    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='flex gap-36'>
                <button  className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block mx-auto'
                    onClick={()=>navigate('/signup')}>Sign Up</button>
                <button  className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block mx-auto'
                    onClick={()=>navigate('/login')}>Login</button>
            </div>
        </div>
    );
}

export default HomePageWrapper;
