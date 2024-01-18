import React, { useEffect, useState, useRef } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { searchRecipe, commonRecipeApi } from "../../api/recipeApi";
import "./RecipeResults.scss";

function RecipeResults() {
  const [isLoading, setIsLoading] = useState(true);
  const recipeDataRef = useRef({});
  const paginationUrlRef = useRef({});
  const pathName = window.location.pathname;
  const searchName = pathName.substring(pathName.lastIndexOf("/"));

  useEffect(() => {
    if (isLoading) {
      searchRecipe(searchName).then((res) => {
        recipeDataRef.current = res.data;
        let nextPageUri = recipeDataRef.current._links.next;
        let prev = paginationUrlRef.current.next || null;
        if (nextPageUri) {
          paginationUrlRef.current.prev =
            recipeDataRef.current.from > 20 ? prev : null;
          paginationUrlRef.current.next = nextPageUri;
        }
        setIsLoading(false);
      });
    }
    console.log(recipeDataRef);
  }, []);

  const handlePaginationBtnClick = (type) => {
    let pageUri;
    if (type === "prev") {
      pageUri = paginationUrlRef.current.prev;
    } else {
      pageUri = paginationUrlRef.current.next;
    }
    recipeDataRef.current = {};
    setIsLoading(true);
    commonRecipeApi(pageUri.href).then((res) => {
      recipeDataRef.current = res.data;
      let nextPageUri = recipeDataRef.current._links.next;
      let prev = paginationUrlRef.current.next;
      if (nextPageUri) {
        paginationUrlRef.current.prev =
          recipeDataRef.current.from > 20 ? prev : null;
        paginationUrlRef.current.next = nextPageUri;
      }
      setIsLoading(false);
    });
  };

  const renderRecipes = () => {
    let recipeArr = recipeDataRef.current.hits;
    if (recipeArr.length === 0) {
      // show empty state
      return;
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
    <div className="reciperesult__container">
      {isLoading ? (
        <div>Loading.....</div>
      ) : (
        <>
          <div className="reciperesult__heading">
            <span className="reciperesult__title">Recipe Results</span>
            <span className="reciperesult__count">
              {recipeDataRef.current.count} recipes found
            </span>
          </div>
          <div className="reciperesult__cards">{renderRecipes()}</div>
          {paginationUrlRef.current.prev && (
            <div
              onClick={() => {
                handlePaginationBtnClick("prev");
              }}
              className="reciperesult__next"
            >
              prev
            </div>
          )}
          {paginationUrlRef.current.next && (
            <div
              onClick={() => {
                handlePaginationBtnClick("next");
              }}
              className="reciperesult__next"
            >
              next
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default RecipeResults;
