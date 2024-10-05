import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // The items in the cart
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i._id === item._id);
      if (existingItem) {
        existingItem.quantity += item.quantity; // Update quantity if item already exists
      } else {
        state.items.push(item); // Add new item to cart
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item._id !== itemId); // Remove item from cart
    },
    clearCart: (state) => {
      state.items = []; // Clear all items from cart
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item._id === id);
      if (existingItem) {
        existingItem.quantity = quantity; // Update the item's quantity
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
