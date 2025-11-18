import { configureStore } from "@reduxjs/toolkit";
import canvasReducer from "./features/canvas/canvasSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      canvas: canvasReducer
    }
  })
}