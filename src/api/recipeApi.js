import axios from "axios";

let baseURL = "https://api.edamam.com/api/recipes/v2";
let apiKey = process.env.REACT_APP_EDAMAM_API_KEY;
let appId = process.env.REACT_APP_EDAMAM_APP_ID;
let params = {
  app_id: appId,
  app_key: apiKey,
  type: "public",
};

export const searchRecipe = (searchString) => {
  params["q"] = searchString;
  let configData = {
    method: "get",
    url: `${baseURL}`,
    params: params,
  };
  let result = axios(configData);
  return result;
};

export const getRecipeDetails = (recipeHash) => {
  let configData = {
    method: "get",
    url: `${baseURL}/${recipeHash}`,
    params: params,
  };
  let result = axios(configData);
  return result;
};

export const commonRecipeApi = (url) => {
  // let params = {
  //     app_id: appId,
  //     app_key: apiKey,
  //     type: "public",
  //   };
  let configData = {
    method: "get",
    url: url,
    // params: params,
  };
  let result = axios(configData);
  return result;
};
