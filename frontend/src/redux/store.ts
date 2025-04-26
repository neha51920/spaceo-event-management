import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./eventSlice"; // now this will work

const store = configureStore({
  reducer: {
    events: eventReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
