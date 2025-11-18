import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  height: 150,
  width: 300,
}

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    canvasHeight: (state, action) => {
      state.height = action.payload;
    },
    canvasWidth: (state, action) => {
      state.width = action.payload;
    },
  }
});

export const { canvasHeight, canvasWidth } = canvasSlice.actions;

export default canvasSlice.reducer;