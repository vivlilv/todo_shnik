import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import StartPageWrapper from './Components/StartPageWrapper';
import App from './Components/App';
import Login from './Components/Login';
import SignUp from './Components/SignUp';

import './index.css'




/*need 2 params
  {path: '/',
  element: 'App',}
  */
const main_router = createBrowserRouter([
  {
    path:'/',
    element:<StartPageWrapper />,
    errorElement: <div>404 Not Found ...</div>
  },
  {
    path:'/signup',
    element: <SignUp/>
  },
  {
    path:'/login',
    element: <Login/>
  },
  {
    path:'/home',
    element: <App/>
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={main_router} />
  </React.StrictMode>
);

