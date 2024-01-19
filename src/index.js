import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router> // wrapped the app with Router to use router functionalites across app
    <Provider store={store}> // wrapped the app with Provider with store as prop to access store across app
      <App />
    </Provider>
  </Router>,
);