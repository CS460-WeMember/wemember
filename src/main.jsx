import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import ReminderPortal from './screens/ReminderPortal';
import ConfigurationPortal from './screens/ConfigurationPortal';
import Test from './screens/Test';

const router = createBrowserRouter([
{
    path: "/",
    element: <ReminderPortal/>,
},

{
    path:"config",
    element: <ConfigurationPortal/>,
},

{
    path:"test",
    element: <Test/>,
}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
