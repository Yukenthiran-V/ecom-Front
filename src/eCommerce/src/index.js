// filepath: e:\personal projects\eCommerce-Website-main\eCommerce\src\index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/crimson-pro";
import reportWebVitals from "./reportWebVitals";

//router
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Router";

//bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../src/css/mystyle.css";
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
 <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <RouterProvider router={router} />
</GoogleOAuthProvider>
);

reportWebVitals();