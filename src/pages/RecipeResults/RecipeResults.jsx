import React, { useEffect, useState, useRef } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { searchRecipe, commonRecipeApi } from "../../api/recipeApi";
import "./RecipeResults.scss";

function RecipeResults() {
  const [isLoading, setIsLoading] = useState(true);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const recipeDataRef = useRef({});
  const paginationUrlRef = useRef({});
  const pathName = window.location.pathname;
  const navigate = useNavigate();
  const searchName = pathName
    .substring(pathName.lastIndexOf("/"))
    .split("/")
    .join("");

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
  }, []);

  useEffect(() => {
    let timeoutId;
    if (showLoadMore) {
      timeoutId = setTimeout(() => {
        let nextSetUri = recipeDataRef.current._links.next;
        commonRecipeApi(nextSetUri.href).then((res) => {
          let currentRecipeList = [
            ...recipeDataRef.current.hits,
            ...res.data.hits,
          ];
          res.data.hits = currentRecipeList;
          recipeDataRef.current = res.data;
          setShowLoadMore(false);
        });
      }, 2000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [showLoadMore]);

  const trackScrolling = (e) => {
    let resultContainer =
      e.currentTarget || document.getElementById("recipeResultContainer");
    let scrollDiff = Math.floor(
      resultContainer.scrollHeight - resultContainer.scrollTop
    );
    let nextSetUri = recipeDataRef.current._links.next;
    if (scrollDiff === Math.floor(resultContainer.clientHeight) && nextSetUri) {
      setShowLoadMore(true);
    }
  };

  const renderRecipes = () => {
    let recipeArr = recipeDataRef.current.hits;
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
    <div
      onScroll={trackScrolling}
      id="recipeResultContainer"
      className="reciperesult__container"
    >
      {isLoading ? (
        <div className="reciperesult__loading">
          <Loader text={"Cooking..."} type={"primary"} />
        </div>
      ) : (
        <>
          <div className="reciperesult__heading">
            <span className="reciperesult__title">Recipe Results</span>
            <span className="reciperesult__count">
              {recipeDataRef.current.count} recipes found for "{searchName}"
            </span>
          </div>
          <div className="reciperesult__cards">{renderRecipes()}</div>
          {showLoadMore && (
            <div className="reciperesult__loadmore">
              {" "}
              <Loader />{" "}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default RecipeResults;
