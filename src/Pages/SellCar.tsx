import React, { BaseSyntheticEvent, useState } from "react";
import { GoBack } from "../Components/GoBack";
import { Typeahead } from "react-bootstrap-typeahead";
import * as Collection from "../Components/Collection";
import { useForm } from "../Components/UseForm";
import { useNavigate, useParams } from "react-router-dom";
import { handleDrop } from "../Components/Functions";
import { carInfo } from "../Service/Service";
import { ToastContainer, toast } from "react-toastify";
import { app } from "../Service/Firebase";

const db = app.firestore();

export const SellCar: React.FC = () => {
  const navigate = useNavigate();
  const notify = (msg: string, notificationType: string) => {
    //@ts-ignore
    toast[notificationType](msg);
  };
  let { type } = useParams<string>();
  const sellFormData = {
    sellerId: JSON.parse(sessionStorage.getItem("profile")!)._id,
    sellStatus: false,
    address: "",
    brand: "",
    description: "",
    fuel: "",
    mobileNo: "",
    model: "",
    price: "",
    run: type === "old" ? "" : 0,
    sellerName: JSON.parse(sessionStorage.getItem("profile")!).name,
    type: "",
    year: type === "old" ? "" : new Date().getFullYear(),
  };
  const { values, setValues, handleInput, validateMobile } =
    useForm(sellFormData);
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);
  const [img3, setImg3] = useState(null);
  const [img4, setImg4] = useState(null);
  const [carBrand, setCarBrand] = useState<number>();
  const validateForm = () => {
    const temp = {
      ...sellFormData,
      sellStatus: "",
      sellerId: "",
    };
    temp.address = values.address ? "" : "Address is required";
    temp.brand = values.brand ? "" : "Brand is required";
    temp.fuel = values.fuel ? "" : "Fuel is required";
    temp.mobileNo = validateMobile(values.mobileNo)
      ? ""
      : "Check mobile number";
    temp.model = values.model ? "" : "Model is required";
    temp.price = values.price ? "" : "Price is required";
    temp.run = values.run || type === "new" ? "" : "Run is required";
    temp.sellerName = values.sellerName ? "" : "Seller Name is required";
    temp.type = values.type ? "" : "Type is required";
    temp.year = values.year ? "" : "Year is required";
    temp.mobileNo !== "" && notify(temp.mobileNo, "error");
    return Object.values(temp).every((x) => x === "");
  };

  const onFileChange = async (e: BaseSyntheticEvent) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    switch (e.target.name) {
      case "img1":
        setImg1(await fileRef.getDownloadURL());
        break;
      case "img2":
        setImg2(await fileRef.getDownloadURL());
        break;
      case "img3":
        setImg3(await fileRef.getDownloadURL());
        break;
      case "img4":
        setImg4(await fileRef.getDownloadURL());
        break;
      default:
        break;
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const id = JSON.parse(sessionStorage.getItem("profile")!)._id;
      if (img1) {
        await db
          .collection("car-images")
          .doc(id + 1)
          .set({
            Image: img1,
            UserId: id,
          });
      }
      if (img2) {
        await db
          .collection("car-images")
          .doc(id + 2)
          .set({
            Image: img2,
            UserId: id,
          });
      }
      if (img3) {
        await db
          .collection("car-images")
          .doc(id + 3)
          .set({
            Image: img3,
            UserId: id,
          });
      }
      if (img4) {
        await db
          .collection("car-images")
          .doc(id + 4)
          .set({
            Image: img4,
            UserId: id,
          });
      }
      carInfo.sellCar(values, navigate);
    } else {
      notify("Please fill all the fields", "error");
    }
  };
  return (
    <div className="sell-car">
      <GoBack />
      <div className="sell-car__heading m-b-16">{"Sell " + type + " car"}</div>
      <form onSubmit={handleSubmit}>
        <div className="width-50">
          <div className="sell-car__car-info">
            <strong className="field-required">Brand</strong>
            <Typeahead
              placeholder="Choose a brand"
              id="car-brand"
              selected={[values.brand]}
              onInputChange={(selected) =>
                handleDrop(selected, "brand", setCarBrand, values, setValues)
              }
              onChange={(selected) =>
                handleDrop(selected, "brand", setCarBrand, values, setValues)
              }
              className="searchabel-dropdown m-b-16 m-t-4"
              options={Collection.carBrands}
            />
            <strong className="field-required">Model</strong>
            <Typeahead
              placeholder="Choose a model"
              id="car-model"
              selected={[values.model]}
              onInputChange={(selected) =>
                handleDrop(selected, "model", setCarBrand, values, setValues)
              }
              onChange={(selected) =>
                handleDrop(selected, "model", setCarBrand, values, setValues)
              }
              className="searchabel-dropdown m-b-16 m-t-4"
              options={
                carBrand === undefined
                  ? []
                  : Collection.carBrands[carBrand].model
              }
            />
            <strong className="field-required">Type</strong>
            <Typeahead
              placeholder="Choose a type"
              id="car-type"
              selected={[values.type]}
              onInputChange={(selected) =>
                handleDrop(selected, "type", setCarBrand, values, setValues)
              }
              onChange={(selected) =>
                handleDrop(selected, "type", setCarBrand, values, setValues)
              }
              className="searchabel-dropdown m-b-16 m-t-4"
              options={Collection.carType}
            />
            {type === "old" && (
              <div className="dfc m-b-16">
                <strong className="field-required">Year</strong>
                <input
                  type="number"
                  min={2000}
                  max={new Date().getFullYear()}
                  name="year"
                  value={values.year}
                  onChange={handleInput}
                  className="input-styles"
                />
              </div>
            )}
            <div className="dfc m-b-16">
              <strong className="field-required">Sell price</strong>
              <input
                type="number"
                name="price"
                value={values.price}
                onChange={handleInput}
                className="input-styles"
              />
              {type === "old" && (
                <span className="color--grey-darker ft-sz-8">
                  2% commission will be charged by CarCult
                </span>
              )}
            </div>
          </div>
          <div className="sell-car__image-upload">
            Upload photos -- Give option to add upto 4 images
            <input type="file" name="img1" onChange={onFileChange} />
            <input type="file" name="img2" onChange={onFileChange} />
            <input type="file" name="img3" onChange={onFileChange} />
            <input type="file" name="img4" onChange={onFileChange} />
          </div>
        </div>
        <div className="width-50">
          <strong className="field-required">Fuel</strong>
          <Typeahead
            placeholder="Choose fuel type"
            id="car-fuel"
            selected={[values.fuel]}
            onInputChange={(selected) =>
              handleDrop(selected, "fuel", setCarBrand, values, setValues)
            }
            onChange={(selected) =>
              handleDrop(selected, "fuel", setCarBrand, values, setValues)
            }
            className="searchabel-dropdown m-b-16 m-t-4"
            options={Collection.fuelType}
          />
          {type === "old" && (
            <div className="dfc m-b-16">
              <strong className="field-required">Run</strong>
              <input
                type="number"
                name="run"
                value={values.run}
                max={150000}
                onChange={handleInput}
                className="input-styles"
              />
            </div>
          )}
          <div className="dfc m-b-16">
            <strong>Description </strong>
            <textarea
              name="description"
              onChange={handleInput}
              className="input-area m-t-4"
              cols={15}
              rows={3}
            />
          </div>
          <div className="sell-car__seller-info">
            <div className="dfc m-b-16">
              <strong className="field-required">
                Add your Location / Address
              </strong>
              <textarea
                name="address"
                onChange={handleInput}
                className="input-area m-t-4"
                cols={15}
                rows={3}
              />
            </div>
            <div className="dfc m-b-16">
              <strong className="field-required">
                {type === "old" ? "Your name" : "Dealers Name"}
              </strong>
              <input
                type="text"
                name="sellerName"
                value={values.sellerName}
                onChange={handleInput}
                className="input-styles"
              />
            </div>
            <div className="dfc m-b-16">
              <strong className="field-required">Contact number</strong>
              <input
                type="number"
                name="mobileNo"
                onChange={handleInput}
                className="input-styles"
              />
            </div>
          </div>
          <div className="df-ac-jc">
            <button className="sell-car__sell-btn" type="submit">
              Sell
            </button>
          </div>
        </div>
      </form>
      <ToastContainer position="top-center" autoClose={1500} />
    </div>
  );
};
