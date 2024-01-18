import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function RecipeView() {
  const selectedRecipeUri = useSelector((state) => state.selectedRecipeUri);
  return <div>RecipeView</div>;
}

export default RecipeView;
