import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";

import DataProvider from "./store/DataProvider";
import { Toaster } from "react-hot-toast";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <DataProvider>
      <BrowserRouter>
        <Toaster />
        <App />
      </BrowserRouter>
    </DataProvider>
  </AuthContextProvider>
);
