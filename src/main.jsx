import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import ReminderPortal from './screens/ReminderPortal';
import ConfigPortalSetTask from './screens/ConfigPortalSetTask';
import ConfigPortalSetTime from './screens/ConfigPortalSetTime';
import ConfigPortalSetPicture from './screens/ConfigPortalSetPicture';
import ConfigPortalSetLights from './screens/ConfigPortalSetLights';
import ConfigPortalSetOthers from './screens/ConfigPortalSetOthers';
import Test from './screens/Test';

const router = createBrowserRouter([
{
    path: "/",
    element: <ReminderPortal/>,
},

{
    path:"config/settask",
    element: <ConfigPortalSetTask/>,
},

{
    path:"config/settime",
    element: <ConfigPortalSetTime/>,
},

{
    path:"config/setpicture",
    element: <ConfigPortalSetPicture/>,
},

{
    path:"config/setlights",
    element: <ConfigPortalSetLights/>,
},

{
    path:"config/setothers",
    element: <ConfigPortalSetOthers/>,
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
