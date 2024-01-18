import { configureStore } from "@reduxjs/toolkit";
import selectedRecipeReducer from "../reducers/epicureReducers";

const store = configureStore({ reducer: selectedRecipeReducer });

export default store;
