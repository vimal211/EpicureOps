import { createSlice, nanoid } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

const initalSelectedRecipe = {
  selectedRecipeUri: "",
};

const initalHistory = {
  searchHistory: [],
};

const selectedRecipeSlice = createSlice({
  name: "selected recipe",
  initialState: initalSelectedRecipe,
  reducers: {
    updateSelectedUri: (state, action) => {
      state.selectedRecipeUri = action.payload;
    },
  },
});

const searchHistorySlice = createSlice({
  name: "search history",
  initialState: initalHistory,
  reducers: {
    addHistory: (state, action) => {
      const history = {
        id: nanoid(),
        text: action.payload,
      };
      let newState = state.searchHistory.filter(
        (item) => item.text !== history.text,
      );
      newState.unshift(history);
      state.searchHistory = newState;
    },
  },
});

export const { updateSelectedUri } = selectedRecipeSlice.actions;
export const { addHistory } = searchHistorySlice.actions;
export default combineReducers({
  selectedRecipeReducer: selectedRecipeSlice.reducer,
  searchHistoryReducer: searchHistorySlice.reducer,
});
