import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const API_BASE_URL = 'http://localhost:8000/';

function SignUp(){
    const navigate = useNavigate();
    const [userCredentials, setUserCredentials] = useState({username:'',email:'',password1:'',password2:''})

    function onSignUp(){
      navigate('/login')
    }

    const signup =(event)=>
    {
      event.preventDefault();
      axios.post(`${API_BASE_URL}users/api/dj-rest-auth/registration/`,userCredentials)
      .then(response => {
        onSignUp();
    })
    .catch(err => {
        alert('Sign up failed. Please try again.');
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
      <h2 className='text-3xl font-bold mb-4'>Create your account</h2>
      <form className='w-full max-w-sm' onSubmit={signup}>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Username:
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type="text" name="username" value={userCredentials.username} onChange={handleInputChange} />
          </label>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Email:
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type="text" name="email" value={userCredentials.email} onChange={handleInputChange} />
          </label>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Password:
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type="text" name="password1" value={userCredentials.password1} onChange={handleInputChange} />
          </label>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Repeat password:
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type="text" name="password2" value={userCredentials.password2} onChange={handleInputChange} />
          </label>
        </div>
        <button className='block mx-auto bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          type="submit">Register</button>
      </form>
      </div>
    )
  }
  


export default SignUp;
