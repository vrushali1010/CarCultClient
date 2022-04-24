import React, { useEffect, useState } from "react";
import { BuyCarCard } from "../Components/BuyCarCard";
import { GoBack } from "../Components/GoBack";
import { BoughtCar } from "../Models/ComponentModels";
import { orderService } from "../Service/Service";

export const MyOrder: React.FC = () => {
  const _id = JSON.parse(sessionStorage.getItem("profile")!)._id;
  const [buy, setBuy] = useState<BoughtCar[]>([]);
  const [sell, setSell] = useState<BoughtCar[]>([]);
  const [update, setUpdate] = useState<boolean>(false);
  const handleEdit = (id: string, price: number) => {
    orderService.updateCar(id, { price }, setUpdate);
  };
  useEffect(() => {
    orderService.getBuylist(_id, setBuy);
    orderService.getSelllist(_id, setSell);
  }, [_id, update]);
  return (
    <div className="cart-page">
      <GoBack />
      {console.log(sell)}
      <strong className="cart-page__heading">
        {buy.length || sell.length > 0
          ? "Bought / Sold Cars"
          : "You have not bought or sold any car yet"}
      </strong>
      {(buy.length || sell.length > 0) && (
        <div className="df-ac-jb m-t-16 width-100">
          <div
            className="dfc-js m-l-16"
            style={{ height: "80vh", width: "45%" }}
          >
            <h2 className="color--white">Bought cars</h2>
            <div className="cart-page__cart-items">
              {buy.map((card) => (
                <div className="m-t-32" key={card._id}>
                  <BuyCarCard
                    brand={card.brand}
                    model={card.model}
                    fuel={card.fuel}
                    year={card.year}
                    type={card.type}
                    run={card.run}
                    price={card.price}
                    state="buy"
                  />
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderLeft: "6px solid #fff", height: "80vh" }} />
          <div
            className="dfc-js m-r-16"
            style={{ height: "80vh", width: "45%" }}
          >
            <h2 className="color--white">Sold Cars</h2>
            <div className="cart-page__cart-items">
              {sell.map((card) => (
                <div className="m-t-32" key={card._id}>
                  <BuyCarCard
                    brand={card.brand}
                    model={card.model}
                    fuel={card.fuel}
                    year={card.year}
                    type={card.type}
                    run={card.run}
                    price={card.price}
                    state="sell"
                    handleEdit={(price: number) => handleEdit(card._id!, price)}
                    sellStatus={card.sellStatus}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
