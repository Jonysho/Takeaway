import { createContext, useEffect, useReducer } from 'react';
import { checkAdminTokenAPI, checkUserTokenAPI } from '../api/authApi';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(action.payload))
      return { user: action.payload }
    case 'LOGOUT':
      // Remove user from storage
      localStorage.removeItem('user')
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      const token = user.token;
      // Check if the token has expired
      checkUserTokenAPI(token)
        .then(() => {
          // Check admin token
          checkAdminTokenAPI(token)
          .then(() => {
              dispatch({ type: 'LOGIN', payload: {...user, isAdmin: true} });
            })
            .catch(() => {
              dispatch({ type: 'LOGIN', payload: {...user, isAdmin: false} });

            });
        }).catch(() => {
          dispatch({ type: 'LOGOUT' });
        })
      
    }    
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
