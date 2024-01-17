import axios from "axios";

let baseURL = "https://api.edamam.com/api/recipes/v2";
let apiKey = process.env.REACT_APP_EDAMAM_API_KEY;
let appId = process.env.REACT_APP_EDAMAM_APP_ID;

export const searchRecipe = async (searchString) => {
  let params = {
    app_id: appId,
    app_key: apiKey,
    type: "public",
    q: searchString,
  };
  let configData = {
    method: "get",
    url: `${baseURL}`,
    params: params,
  };
  let result = await axios(configData);
  console.log(result, "resultttt");
};
