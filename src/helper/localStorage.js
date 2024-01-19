export const getLocalStorageValue = (key) => {
    let data = localStorage.getItem(key);
    return JSON.parse(data);
}
export const setLocalStorageValue = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}