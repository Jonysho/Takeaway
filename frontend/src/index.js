import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css"
import { BrowserRouter} from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId='104196203671-5skq90a5mv5j7t76m9m3mqdpqrqbuasg.apps.googleusercontent.com'>
  <React.StrictMode>
    <AuthContextProvider>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </AuthContextProvider>    
  </React.StrictMode>
  </GoogleOAuthProvider>
);