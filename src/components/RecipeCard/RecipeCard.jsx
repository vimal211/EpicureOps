import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateSelectedUri } from "../../reducers/epicureReducers";
import "./RecipeCard.scss";

function RecipeCard({ imgSrc, name, uri }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRecipeSelect = (uri) => {
    dispatch(updateSelectedUri(uri));
    navigate(`/recipe/view`);
  };
  return (
    <div
      onClick={() => {
        handleRecipeSelect(uri);
      }}
      data-recipe-uri={uri}
      className="recipecard__container"
    >
      <div className="recipecard__img">
        <img src={imgSrc} alt="" srcSet="" />
      </div>
      <div className="recipecard__detail">
        <span>{name}</span>
      </div>
    </div>
  );
}
// there will be many RecipeCard component in the app, so it is better to use memo to avoid unwanted rerendring
export default memo(RecipeCard);
