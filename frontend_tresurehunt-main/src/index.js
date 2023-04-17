import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Quiz from './pages/quiz';
import LeaderBoard from './pages/leaderboard';
import AdminLogin from './pages/adminSigin';
import Home from './pages/Home';
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/quiz",
    element: <Quiz />,
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
  {
    path: "/leaderboard",
    element: <LeaderBoard />,
  }, {
    path: "/admin-login",
    element: <AdminLogin />,
  }, {
    path: "/home",
    element: <Home/>,
  }
]);




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);

