import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
} from "react-router-dom";
//styles
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
