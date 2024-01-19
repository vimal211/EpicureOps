import { configureStore } from "@reduxjs/toolkit";
import allReducers from "../reducers/epicureReducers";

const store = configureStore({ reducer: allReducers });

export default store;
