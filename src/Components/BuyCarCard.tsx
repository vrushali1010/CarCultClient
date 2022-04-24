import React, { BaseSyntheticEvent, useState } from "react";
import { BoughtCar } from "../Models/ComponentModels";
import { numberSeparator } from "./Functions";

export const BuyCarCard: React.FC<BoughtCar> = (props) => {
  const {
    brand,
    model,
    fuel,
    year,
    type,
    run,
    price,
    state,
    sellStatus,
    handleEdit,
  } = props;
  const [newPrice, setNewPrice] = useState<number>(price);
  const [edit, setEdit] = useState<boolean>(false);
  return (
    <div className="product-card">
      {sellStatus && <div className="sold-txt">Sold</div>}
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
            {!sellStatus && state === "sell" && edit ? (
              <input
                type="number"
                value={newPrice}
                onChange={(e: BaseSyntheticEvent) => {
                  setNewPrice(e.target.value);
                }}
              />
            ) : (
              numberSeparator((price * 102) / 100)
            )}
          </p>
        </div>
      </div>
      {!sellStatus && state === "sell" && (
        <div
          className="df m-t-16
m-t-16"
        >
          <button
            className="redirect-btn m-r-16"
            onClick={() => setEdit(!edit)}
          >
            Edit
          </button>
          <button
            className="redirect-btn"
            onClick={() => {
              handleEdit!(newPrice);
              setEdit(!edit);
            }}
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};
