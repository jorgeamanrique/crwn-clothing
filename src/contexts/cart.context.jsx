import { createContext, useReducer } from 'react';
import {createAction} from '../utils/reducer/reducer.utils';

const addCartItem = (cartItems, productToAdd) => {
  const existstingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
  if(existstingCartItem) {
    return cartItems.map((cartItem) => 
      cartItem.id === productToAdd.id 
      ? {...cartItem, quantity: cartItem.quantity + 1} 
      : cartItem);
  }
  return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, productToRemove) => {
  const existstingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id);
  if(existstingCartItem.quantity > 1) {
    return cartItems.map((cartItem) => 
      cartItem.id === productToRemove.id 
      ? {...cartItem, quantity: cartItem.quantity - 1} 
      : cartItem);
  }

  return cartItems.filter((itemCart) => itemCart.id !== productToRemove.id)
}

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)
}

export const  CartContext = createContext({
  setIsCartOpen: () => {},
  isCartOpen: false,
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartTotal: 0
});

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { 
        ...state, 
        ...payload,
      };

    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
        return { 
        ...state, 
        isCartOpen: payload,
      };

    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {

  // const [{ isCartOpen }, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  // console.log(`isCartOpen---> ${isCartOpen}`)
  // console.log(isCartOpen);
  // const setIsCartOpen = (value) =>{
  //   dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen: value });
  // }

  const [{isCartOpen, cartItems, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    const newCartTotal = newCartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0);

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { 
        cartItems: newCartItems, 
        cartTotal: newCartTotal, 
        cartCount: newCartCount 
      })
    );
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemReducer(newCartItems);
  };

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemReducer(newCartItems);
  };

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemReducer(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  }
  
  const value = { 
    isCartOpen, 
    setIsCartOpen, 
    addItemToCart, 
    cartItems, 
    cartCount, 
    removeItemFromCart,
    clearItemFromCart,
    cartTotal
  };

  return (<CartContext.Provider value={value}>{children}</CartContext.Provider>)
}