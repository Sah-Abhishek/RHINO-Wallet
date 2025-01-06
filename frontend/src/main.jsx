import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css'
import App from './App.jsx'
import UnlockPage from './pages/UnlockPage.jsx'
import Signup from './pages/Signup.jsx';
import CreateWallet from './pages/CreateWallet.jsx';

const googleClientId = import.meta.env.VITE_clientID;


const router = createBrowserRouter([
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/unlockPage",
    element: <UnlockPage />
  },
  {
    path: "/createWallet",
    element: <CreateWallet />
  },
  // {
  //   path: "*",  // Catch-all route for undefined paths
  //   element: <NotFound />  // Display NotFound component for all unknown routes
  // }
]);


createRoot(document.getElementById('root')).render(

  <GoogleOAuthProvider clientId={googleClientId}>

    <RouterProvider router={router} />

  </GoogleOAuthProvider>


)
