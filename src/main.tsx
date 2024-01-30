import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './css/index.css'
import './css/index.scss'

import { ThemeProvider } from '@/components/theme-provider'
import store from './Redux/store.ts'
import Banners from './Screens/Banners/Banners.tsx'
import Categories from './Screens/Categories/Categories.tsx'
import Code from './Screens/Code/Code.tsx'
import Dashboard from './Screens/Dashboard.tsx'
import EditProfile from './Screens/EditProfile/EditProfile.tsx'
import Home from './Screens/Home.tsx'
import Login from './Screens/Login.tsx'
import NewCreator from './Screens/NewCreator.tsx'
import StickerManagement from './Screens/Sticker Management/StickerManagement.tsx'
import Creators from './Screens/Users/Creators.tsx'
import Users from './Screens/Users/Users.tsx'
import Videos from './Screens/Videos/Videos.tsx'
import PopupAlert from './components/PopupAlert.tsx'
import { PopupAlertContextProvider } from './context/PopupAlertContext.tsx'
import PriceManagement from './Screens/PriceManagement/PriceManagement.tsx'

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
        element: <Creators />,
      },
      {
        path: '/creators/new',
        element: <NewCreator />,
      },
      {
        path: '/users',
        element: <Users />,
      },
      {
        path: '/videos',
        element: <Videos />,
      },
      {
        path: '/sticker_management',
        element: <StickerManagement />,
      },
      {
        path: '/price_management',
        element: <PriceManagement />,
      },
      {
        path: '/creator_withdraw',
        element: <div>Creator Withdraw</div>,
      },
      {
        path: '/edit_profile',
        element: <EditProfile />,
      },
      {
        path: '/banners',
        element: <Banners />,
      },
      {
        path: '/categories',
        element: <Categories />,
      },
      {
        path: '/code',
        element: <Code />,
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
    <Provider store={store}>
      <PopupAlertContextProvider>
        <PopupAlert />
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <RouterProvider router={router} />
        </ThemeProvider>
      </PopupAlertContextProvider>
    </Provider>
  </React.StrictMode>,
)
