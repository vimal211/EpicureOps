import { configureStore } from "@reduxjs/toolkit";
import allReducers from "../reducers/epicureReducers";

// redux store created to manage state across app
const store = configureStore({ reducer: allReducers });

export default store;
