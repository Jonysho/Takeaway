// CartContext.js
import React, { createContext, useReducer, useEffect } from 'react';
import { addToCartApi, getCartApi } from '../api/cartApi';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cartItems: [],
  });

  useEffect(() => {
    // Fetch the initial cart data from getCartApi
    const getCart = async () => {
      try {
        const cartData = await getCartApi();
        dispatch({ type: 'SET_CART_ITEMS', payload: cartData.items });
      } catch (error) {
        console.error('Failed to fetch cart data:', error);
      }
    };

    getCart();
  }, []);

  const addToCart = async (item) => {
    try {
      // Call the addToCartApi to add the item to the cart
      await addToCartApi(item);
      dispatch({ type: 'ADD_TO_CART', payload: item });
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
