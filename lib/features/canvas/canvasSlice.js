import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  height: 0,
  width: 0,
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