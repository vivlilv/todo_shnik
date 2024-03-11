import React, {useState, useEffect} from 'react';
import axios from 'axios';



const API_BASE_URL = 'http://localhost:8000/';

function Login({onLogin}){

    const [userCredentials, setUserCredentials] = useState({username:'',password:''})

    const login =(event)=>
    {
      event.preventDefault();
      axios.post(`${API_BASE_URL}users/api/dj-rest-auth/login/`,userCredentials)
      .then(response => {
        console.log(response.data.key)
        if (response.data.key) {
            localStorage.setItem('token', response.data.key);
            setUserCredentials({ username: '', password: '' });
            alert('You are logged in!');
            onLogin();
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
      <>
      <h2>Login Page</h2>
      <form onSubmit={login}>
        <label>
          Username:
          <input type="text" name="username" value={userCredentials.username} onChange={handleInputChange} />
        </label>
        <label>
          Password:
          <input type="text" name="password" value={userCredentials.password} onChange={handleInputChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </>
    )
  }

export default Login;
