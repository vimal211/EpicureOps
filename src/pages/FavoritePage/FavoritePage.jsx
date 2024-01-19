import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { getLocalStorageValue } from "../../helper/localStorage";
import "./FavoritePage.scss";

function FavoritePage() {
  const favorites = useMemo(() => {
    let data = getLocalStorageValue("epicureFav") || [];
    return data;
  }, []);

  const navigate = useNavigate();

  const renderFavoritesCards = () => {
    let recipeArr = favorites;
    if (recipeArr.length === 0) {
      return (
        <div
          onClick={() => {
            navigate("/");
          }}
          className="reciperesult__empty"
        >
          Search other recipes
        </div>
      );
    } else {
      return recipeArr.map((item, index) => (
        <div key={`epicureRecipe-${index}`}>
          <RecipeCard
            imgSrc={item.recipe.image}
            calories={item.recipe.calories}
            name={item.recipe.label}
            uri={item._links.self.href}
          />
        </div>
      ));
    }
  };

  return (
    <div className="favorites__container">
      <div className="favorites__heading">
        <div className="favorites__title">
          Favorite Recipes ({favorites.length})
        </div>
      </div>
      <div className="favorites__cards">{renderFavoritesCards()}</div>
    </div>
  );
}

export default FavoritePage;
