import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login";
import { SignUp } from "./Pages/SignUp";
import { Product } from "./Pages/Product";
import { SellCar } from "./Pages/SellCar";
import { Favourites } from "./Pages/Favourites";
import { Profile } from "./Pages/Profile";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Cart } from "./Pages/Cart";
import { MyOrder } from "./Pages/MyOrder";
import { SiteData } from "./Pages/SiteData";

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product-page/:type" element={<Product />} />
      <Route path="/sell-car/:type" element={<SellCar />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/my-order" element={<MyOrder />} />
      <Route path="/site-data" element={<SiteData />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
