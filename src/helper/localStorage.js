// get value from local storage
export const getLocalStorageValue = (key) => {
  let data = localStorage.getItem(key);
  return JSON.parse(data);
};

//set valuu in local storage
export const setLocalStorageValue = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
