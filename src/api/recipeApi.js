import axios from "axios";

const baseURL = "https://api.edamam.com/api/recipes/v2";
const apiKey = process.env.REACT_APP_EDAMAM_API_KEY;
const appId = process.env.REACT_APP_EDAMAM_APP_ID;

let params = {
  app_id: appId,
  app_key: apiKey,
  type: "public",
};

//api to search recipe using string
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

//api to search using url
export const commonRecipeApi = (url) => {
  let configData = {
    method: "get",
    url: url,
  };
  let result = axios(configData);
  return result;
};
