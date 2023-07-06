import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css"
import { BrowserRouter} from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CartProvider } from './context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='104196203671-198rofen4hkut1o83dofs6pa75d1qq4e.apps.googleusercontent.com'>
    <AuthContextProvider>
      <CartProvider>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
      </CartProvider>
    </AuthContextProvider>    
    </GoogleOAuthProvider>
  </React.StrictMode>
);