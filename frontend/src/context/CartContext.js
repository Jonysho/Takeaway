import { createContext, useEffect, useReducer } from 'react';

export const CartContext = createContext();

export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      const cart = action.payload
      let total = 0;
      cart.map((item) => {
        total += item.amount
      })
      return {
        cart: cart,
        total: total.toFixed(2)
      };
    case 'CLEAR_CART':
      return {
        cart: [],
        total: 0.00,
      };
    default:
      return state;
  }
};


export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: [],
    total: 0.00,
  });
  
  return (
    <CartContext.Provider
      value={{
        ...state, dispatch
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
