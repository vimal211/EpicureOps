import { createSlice, nanoid } from "@reduxjs/toolkit";

const initalSelectedRecipe = {
  selectedRecipeUri: "",
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

export const { updateSelectedUri } = selectedRecipeSlice.actions;
export default selectedRecipeSlice.reducer;
