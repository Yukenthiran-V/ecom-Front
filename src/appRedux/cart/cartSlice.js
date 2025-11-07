import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    storeCartApi: (state, action) => {
      state.items = action.payload;
      state.total = action.payload.length;
    },
    addToCart: (state, action) => {
      state.items.push(action.payload);
      state.total += action.payload.price;
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
      state.total = state.items.reduce((sum, item) => sum + item.price, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { storeCartApi,addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
