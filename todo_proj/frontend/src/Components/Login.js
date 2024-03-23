import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const API_BASE_URL = 'http://localhost:8000/';

function Login(){
    const navigate = useNavigate();
    const [userCredentials, setUserCredentials] = useState({username:'',password:''})
   
    React.useEffect(()=>
    {if (localStorage.getItem('token')){
       navigate('/home');
    }},[localStorage.getItem('token'), navigate])

    const login =(event)=>
    {
      event.preventDefault();
      axios.post(`${API_BASE_URL}users/api/dj-rest-auth/login/`,userCredentials)
      .then(response => {
        console.log(response.data.key)
        if (response.data.key) {
            localStorage.setItem('token', response.data.key);
            setUserCredentials({ username: '', password: '' });
            console.log('You are logged in!');
        } else {
            alert('Wrong credentials');
            console.log(userCredentials)
        }
    })
    .catch(err => {
        alert('Login failed. Please try again.');
        console.error(err);
    });
    }
    
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setUserCredentials({//adds previous input to the specific field(via alias 'name')
          ...userCredentials,
          [name]: value
        })
      }

    return (
      <div className='flex flex-col items-center justify-center h-screen'>
      <h2 className='text-3xl font-bold mb-4'>Please enter your credentials</h2>
      <form className='w-full max-w-sm' onSubmit={login}>
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2'>
          Username:
          <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type="text" name="username" value={userCredentials.username} onChange={handleInputChange} />
        </label>
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2'>
          Password:
          <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type="text" name="password" value={userCredentials.password} onChange={handleInputChange} />
        </label>
      </div>
        <button className='block mx-auto bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          type="submit">Login</button>
      </form>
      </div>
    )
  }

export default Login;
