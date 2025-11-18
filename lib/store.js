import { configureStore } from "@reduxjs/toolkit";
import { canvasSlice } from "./features/canvas/canvasSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      canvasSlice
    }
  })
}