import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './css/index.css'
import './css/index.scss'

import { ThemeProvider } from '@/components/theme-provider'
import Home from './Screens/Home.tsx'
import Login from './Screens/Login.tsx'
import PopupAlert from './components/PopupAlert.tsx'
import { PopupAlertContextProvider } from './context/PopupAlertContext.tsx'
import Dashboard from './Screens/Dashboard.tsx'
import EditProfile from './Screens/EditProfile/EditProfile.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/creators',
        element: <div>Creators</div>,
      },
      {
        path: '/users',
        element: <div>Users</div>,
      },
      {
        path: '/videos',
        element: <div>Videos</div>,
      },
      {
        path: '/price_management',
        element: <div>Price Management</div>,
      },
      {
        path: '/creator_withdraw',
        element: <div>Creator Withdraw</div>,
      },
      {
        path: '/edit_profile',
        element: <EditProfile />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PopupAlertContextProvider>
      <PopupAlert />
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <RouterProvider router={router} />
      </ThemeProvider>
    </PopupAlertContextProvider>
  </React.StrictMode>,
)
