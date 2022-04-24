import React, { useEffect, useState } from "react";
import { CarCard } from "../Components/CarCard";
import { CarModel } from "../Models/ComponentModels";
import { GoBack } from "../Components/GoBack";
import { cartService, favouriteService } from "../Service/Service";
import { app } from "../Service/Firebase";

const db = app.firestore();

export const Favourites: React.FC = () => {
  const [data, setData] = useState<CarModel[]>([]);
  const [update, setUpdate] = useState<boolean>(false);
  const [carsInCart, setCarsInCart] = useState<string[]>([]);

  useEffect(() => {
    if (sessionStorage.getItem("profile") !== null) {
      favouriteService.getFaouriteCars(
        JSON.parse(sessionStorage.getItem("profile")!).email,
        setData
      );
      cartService.getCart(
        JSON.parse(sessionStorage.getItem("profile")!).email,
        setCarsInCart
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
    <div className="favourite-page">
      <GoBack />
      <strong className="favourite-page__heading">
        {data.length > 0
          ? "Favorite Cars"
          : "You have no favourites yet. Please add some favourites"}
      </strong>
      <div className="favourite-page__favourite-items">
        {data.map((card) => (
          <div key={card._id} className="m-t-32">
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
              favourite={true}
              cart={carsInCart.includes(card._id)}
              setUpdate={setUpdate}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
