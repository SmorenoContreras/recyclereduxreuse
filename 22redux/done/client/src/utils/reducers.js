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
      return {
        ...state,
        products: [...action.payload],
      };
    },
    addToCart(state, action) {
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.payload],
      };
    },
    addMultipleToCart(state, action) {
      return {
        ...state,
        cart: [...state.cart, ...action.payload],
      };
    },
    updateCartQuantity(state, action) {
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) =>
          action.payload._id === product._id
            ? { ...product, purchaseQuantity: action.payload.purchaseQuantity }
            : product
        ),
      };
    },
    removeFromCart(state, action) {
      const newState = state.cart.filter((product) => product._id !== action.payload._id);

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };
    },
    clearCart(state) {
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };
    },
    toggleCart(state) {
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };
    },
    updateCategories(state, action) {
      return {
        ...state,
        categories: [...action.payload],
      };
    },
    updateCurrentCategory(state, action) {
      return {
        ...state,
        currentCategory: action.payload,
      };
    },
  },
});

export const {
  updateProducts,
  addToCart,
  addMultipleToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  toggleCart,
  updateCategories,
  updateCurrentCategory,
} = storeSlice.actions;

export default storeSlice.reducer;
