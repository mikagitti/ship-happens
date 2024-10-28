import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameStatusState {
     clickCount: number;
     gameIsRunning: boolean;
}

const initialState: GameStatusState = {
     clickCount: 0,
     gameIsRunning: false,
};

const timerSlice = createSlice({
     name: "gameStatus",
     initialState,
     reducers: {
          incrementClickCount: (state) => {
               state.clickCount += 1;
          },
          resetClickCount: (state) => {
               state.clickCount = 0;
          },
          setGameIsRunning: (state, action: PayloadAction<boolean>) => {
               state.gameIsRunning = action.payload;
          },
     },
});

export const { incrementClickCount, resetClickCount, setGameIsRunning } =
     timerSlice.actions;
export default timerSlice.reducer;
