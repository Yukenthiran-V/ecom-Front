import React from "react";
import ReactDOM from "react-dom/client";

import "@fontsource/crimson-pro";

// Router and Redux
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import router from "./Routes/Router.jsx";
import store from "./appStore/store";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

// Custom CSS
import "../src/css/mystyle.css";
import './App.css';

import { GoogleOAuthProvider } from '@react-oauth/google';
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </Provider>
);

reportWebVitals();
