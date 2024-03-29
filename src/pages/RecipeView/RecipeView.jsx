import React, { useEffect, useRef, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { commonRecipeApi } from "../../api/recipeApi";
import {
  getLocalStorageValue,
  setLocalStorageValue,
} from "../../helper/localStorage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import CookingIllustration from "../../assets/img/cooking-illustraion-2.png";
import "./RecipieView.scss";
import Loader from "../../components/Loader/Loader";

function RecipeView() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFav, setIsFav] = useState(false);
  const navigate = useNavigate();
  const selcetedRecipeRef = useRef();
  const selectedRecipeUri = useSelector(
    (state) => state.selectedRecipeReducer.selectedRecipeUri, // get selected recipe url from redux store
  );
  let favorites = getLocalStorageValue("epicureFav") || []; // get favorite list from local storage

  useEffect(() => {
    if (!selectedRecipeUri) {
      navigate("/");
      return;
    }
    commonRecipeApi(selectedRecipeUri).then((res) => {
      selcetedRecipeRef.current = res.data;
      let recipeUri = res.data.recipe.uri;
      let isInFav = favorites.filter((item) => recipeUri === item.recipe.uri);
      if (isInFav.length > 0) {
        setIsFav(true);
      }
      setIsLoading(false);
    });
  }, [selectedRecipeUri]);

  const renderDishType = () => {
    let dishType = selcetedRecipeRef.current.recipe.dishType;
    return dishType.map((type, index) => {
      return (
        <span key={`dishtype-${index}`}>
          {type}
          {index === dishType.length - 1 ? "" : ","}
        </span>
      );
    });
  };

  const renderIncredients = () => {
    let incredients = selcetedRecipeRef.current.recipe.ingredients || [];
    return incredients.map((item, index) => {
      return <li key={`incredient-${index}`}>{item.text}</li>;
    });
  };

  const handleBackBtnClick = () => {
    navigate(-1);
  };

  const handleFavoriteClick = () => {
    // this function is to handle add/remove item to/from favorite
    let recipeUri = selcetedRecipeRef.current.recipe.uri;
    if (isFav) {
      favorites = favorites.filter((item) => recipeUri !== item.recipe.uri);
    } else {
      favorites.push(selcetedRecipeRef.current);
    }
    setLocalStorageValue("epicureFav", favorites);
    setIsFav((prev) => !prev);
  };

  return (
    <div className="recipeview__container">
      {isLoading ? (
        <div className="recipeview__loader">
          <Loader text={"Cooking..."} type={"primary"} />
        </div>
      ) : (
        <>
          <div onClick={handleBackBtnClick} className="recipeview__back">
            <ArrowBackIcon />
            <span>Back</span>
          </div>
          <div className="recipeview__content">
            <div
              className="recipeview__img"
              style={{
                backgroundImage: `url(${selcetedRecipeRef.current.recipe.image})`,
              }}
            ></div>
            <div className="recipeview__detail">
              <div className="recipeview__detail-name">
                {selcetedRecipeRef.current.recipe.label}
              </div>
              <div className="recipeview__detail-secondaryinfo">
                Calories:{" "}
                <span>
                  {Math.floor(selcetedRecipeRef.current.recipe.calories)} Kcal
                </span>
              </div>
              <div className="recipeview__detail-secondaryinfo">
                {" "}
                Cuisine:{" "}
                <span>{selcetedRecipeRef.current.recipe.cuisineType}</span>{" "}
              </div>
              <div className="recipeview__detail-secondaryinfo">
                Dish Type: {renderDishType()}
              </div>
              <div className="recipeview__detail-secondaryinfo">
                Source: <span>{selcetedRecipeRef.current.recipe.source}</span>
              </div>
              <div onClick={handleFavoriteClick} className="recipeview__addfav">
                <span>Add to favorite</span>
                <FavoriteOutlinedIcon
                  style={{ color: isFav ? "#f87c7c" : "#f8f8f8" }}
                />
              </div>
            </div>
          </div>
          <div className="recipeview__preparation">
            <div className="recipeview__incredients">
              <div className="recipeview__subtitle"> Incredients</div>
              <div>
                <ul>{renderIncredients()}</ul>
              </div>
            </div>
            <div className="recipeview__instruction">
              <img src={CookingIllustration} alt="" srcSet="" />
              <a href={selcetedRecipeRef.current.recipe.url} target="blank">
                Cooking Instruction
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default RecipeView;
