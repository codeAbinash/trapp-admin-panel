import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './css/index.css'
import './css/index.scss'

import { ThemeProvider } from '@/components/theme-provider'
import Home from './Screens/Home.tsx'
import Login from './Screens/Login.tsx'
import { PopupAlertContextProvider } from './context/PopupAlertContext.tsx'
import PopupAlert from './components/PopupAlert.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/dashboard',
        element: <div>dashboard</div>,
      },
      {
        path: '/about',
        element: <div>about</div>,
      },
      {
        path: '/contact',
        element: <div>contact</div>,
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
