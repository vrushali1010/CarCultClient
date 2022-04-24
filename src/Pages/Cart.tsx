import React, { useEffect, useState } from "react";
import { CarCard } from "../Components/CarCard";
import { CarModel } from "../Models/ComponentModels";
import { GoBack } from "../Components/GoBack";
import { cartService, favouriteService } from "../Service/Service";
import { app } from "../Service/Firebase";

const db = app.firestore();

export const Cart: React.FC = () => {
  const [data, setData] = useState<CarModel[]>([]);
  const [update, setUpdate] = useState<boolean>(false);
  const [favouriteCars, setFavouriteCars] = useState<string[]>([]);

  useEffect(() => {
    if (sessionStorage.getItem("profile") !== null) {
      favouriteService.getFavourites(
        JSON.parse(sessionStorage.getItem("profile")!).email,
        setFavouriteCars
      );
      cartService.getCartCars(
        JSON.parse(sessionStorage.getItem("profile")!).email,
        setData
      );
    }
  }, [update]);
  const [imageData, setImageData] = useState<any[]>([]);
  useEffect(() => {
    const fetchimages = async () => {
      const imageCollection = await db.collection("car-images").get();
      setImageData(
        imageCollection.docs.map((doc) => {
          return doc.data();
        })
      );
    };
    fetchimages();
  }, []);
  return (
    <div className="cart-page">
      <GoBack />
      <strong className="cart-page__heading">
        {data.length > 0
          ? "Cart"
          : "You have no items in your cart yet. Please add some items"}
      </strong>
      <div className="cart-page__cart-items">
        {data.map((card) => (
          <div className="m-t-32" key={card._id}>
            <CarCard
              imageUrl={imageData.filter((img) => img.UserId === card.sellerId)}
              year={card.year}
              price={card.price}
              brand={card.brand}
              model={card.model}
              type={card.type}
              run={card.run}
              fuel={card.fuel}
              _id={card._id}
              favourite={favouriteCars.includes(card._id)}
              cart={true}
              removeCart={true}
              setUpdate={setUpdate}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
