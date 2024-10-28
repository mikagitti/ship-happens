import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import gameStatusReducer from "./gameStatusSlice";

export const store = configureStore({
     reducer: {
          gameStatus: gameStatusReducer,
     },
});

// RootState ja AppDispatch tyyppien määrittely
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hookit tyypityksellä
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
