import React, { useState } from "react";
import { CarModel } from "../Models/ComponentModels";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { numberSeparator } from "./Functions";
import test from "../Assets/test.svg";
import { cartService, favouriteService } from "../Service/Service";
import { useNavigate } from "react-router-dom";
import { Popup } from "./Popup";

export const CarCard: React.FC<CarModel> = (props) => {
  const navigate = useNavigate();
  const {
    imageUrl,
    year,
    price,
    brand,
    model,
    fuel,
    type,
    run,
    _id,
    favourite,
    cart,
    removeCart,
    setUpdate,
    handlePopup,
  } = props;
  const [open, setOpen] = useState<boolean>(false);
  const handleFavourite = () => {
    if (sessionStorage.getItem("profile") !== null) {
      favouriteService.addToFavourites(
        {
          id: _id,
          email: JSON.parse(sessionStorage.getItem("profile")!).email,
        },
        setUpdate
      );
    } else {
      alert("Please login to add to favourites");
    }
  };
  const handleBuy = () => {
    cartService.addToBuy(
      {
        id: _id,
        email: JSON.parse(sessionStorage.getItem("profile")!).email,
      },
      setUpdate
    );
  };
  const handleCart = () => {
    if (removeCart) {
      cartService.addToCart(
        {
          id: _id,
          email: JSON.parse(sessionStorage.getItem("profile")!).email,
        },
        setUpdate
      );
    }
    if (cart) {
      navigate("/cart");
      return;
    }
    if (sessionStorage.getItem("profile")) {
      cartService.addToCart(
        {
          id: _id,
          email: JSON.parse(sessionStorage.getItem("profile")!).email,
        },
        setUpdate
      );
    } else {
      alert("Please login to add to cart");
    }
  };
  const getCartBtnTxt = () => {
    if (removeCart) {
      return "Remove from cart";
    }
    if (cart) {
      return "Go to cart";
    } else {
      return "Add to cart";
    }
  };
  return (
    <div className="product-card">
      <div className="product-img">
        <img
          src={imageUrl[0] ? imageUrl[0].Image : test}
          alt="car"
          className="width-100"
          onClick={handlePopup}
        />
        {favourite ? (
          <FavoriteIcon
            className="ft-sz-24 color--red cursor-pointer"
            onClick={handleFavourite}
          />
        ) : (
          <FavoriteBorderIcon
            className="ft-sz-24 color--grey-dark cursor-pointer"
            onClick={handleFavourite}
          />
        )}
      </div>
      <hr />
      <div className="df-ac-jb">
        <div className="card-info__col-1">
          <p>
            <strong>Brand : </strong>
            {brand}
          </p>
          <p>
            <strong>Model : </strong>
            {model}
          </p>
          <p>
            <strong>Fuel type : </strong>
            {fuel}
          </p>
          <p>
            <strong>Year : </strong>
            {year}
          </p>
        </div>
        <div>
          <p>
            <strong>Type : </strong>
            {type}
          </p>
          <p>
            <strong>Run : </strong>
            {numberSeparator(run) + "km"}
          </p>
          <p>
            <strong>Price : </strong>
            {numberSeparator((price * 102) / 100)}
          </p>
        </div>
      </div>
      <hr />
      <div className="df-ac-ja width-100 m-t-8">
        <button className="redirect-btn width-45" onClick={handleCart}>
          {getCartBtnTxt()}
        </button>
        {removeCart && (
          <button
            className="redirect-btn width-45"
            onClick={() => setOpen(true)}
          >
            Buy now
          </button>
        )}
      </div>
      <Popup
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        heading="Buy Car"
        data={
          <div className="buy-popup">
            <strong>Confirm Payment !</strong>
            <strong>{brand + " " + model}</strong>
            <strong>{"Pay: " + numberSeparator((price * 102) / 100)}</strong>
            <button
              onClick={() => {
                setOpen(false);
                handleBuy();
              }}
            >
              Buy
            </button>
          </div>
        }
      />
    </div>
  );
};
