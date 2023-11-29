/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  cart: [],
  cartOpen: false,
  categories: [],
  currentCategory: '',
};

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    updateProducts(state, action) {
      state.products = action.payload;
    },
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cart.find(item => item.id === newItem.id);

      if (!existingItem) {
        state.cart.push(newItem);
      } else {
        // Increase quantity or perform any other logic when item already exists in cart
      }
      state.cartOpen = true;
    },
    removeFromCart(state, action) {
      const itemId = action.payload;
      state.cart = state.cart.filter(item => item.id !== itemId);
      state.cartOpen = state.cart.length > 0;
    },
    updateCartQuantity(state, action) {
      const { itemId, quantity } = action.payload;
      const cartItem = state.cart.find(item => item.id === itemId);

      if (cartItem) {
        cartItem.quantity = quantity;
      }
    },
    clearCart(state) {
      state.cart = [];
      state.cartOpen = false;
    },
    toggleCart(state) {
      state.cartOpen = !state.cartOpen;
    },
    updateCategories(state, action) {
      state.categories = action.payload;
    },
    updateCurrentCategory(state, action) {
      state.currentCategory = action.payload;
    },
    addMultipleToCart(state, action) {
        return {
          ...state,
          cart: [...state.cart, ...action.payload],
        };
      },
    // Add other actions as needed
    // For example:
    /*
    setLoggedInUser(state, action) {
      state.user = action.payload;
    },
    setOrderStatus(state, action) {
      state.orderStatus = action.payload;
    },
    */
  },
});

export const {
  updateProducts,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  toggleCart,
  updateCategories,
  updateCurrentCategory,
  addMultipleToCart
  // Add other action names here
  // For example:
  // setLoggedInUser,
  // setOrderStatus,
} = storeSlice.actions;

export default storeSlice.reducer;
