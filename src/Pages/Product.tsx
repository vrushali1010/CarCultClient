import React, { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { Link, useParams } from "react-router-dom";
import { CarCard } from "../Components/CarCard";
import * as Collection from "../Components/Collection";
import { useForm } from "../Components/UseForm";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { CarModel } from "../Models/ComponentModels";
import { handleDrop, numberSeparator } from "../Components/Functions";
import { carInfo, cartService, favouriteService } from "../Service/Service";
import { Popup } from "../Components/Popup";
import { app } from "../Service/Firebase";
import test from "../Assets/test.svg";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const db = app.firestore();

export const Product: React.FC = () => {
  const { type } = useParams();
  const initialFilter = {
    brand: "",
    model: "",
    type: "",
    year: type === "old" ? "" : new Date().getFullYear(),
    budget: 0,
  };
  const [carData, setCarData] = useState({
    imageUrls: [] as any[],
    address: "",
    brand: "",
    fuel: "",
    created_at: "",
    description: "",
    type: "",
    year: 0,
    price: 0,
    model: "",
    run: 0,
    sellerName: "",
  });
  const [open, setOpen] = useState<boolean>(false);
  const [tempData, setTempData] = useState<CarModel[]>([]);
  const [favouriteCars, setFavouriteCars] = useState<string[]>([]);
  const [carsInCart, setCarsInCart] = useState<string[]>([]);
  const [filteredCards, setFilteredCards] = useState<CarModel[]>(tempData);
  const { values, setValues, handleInput } = useForm(initialFilter);
  const [carBrand, setCarBrand] = useState<number>();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFilteredCards(() => {
      return tempData.filter((card) => {
        const checkList: boolean[] = [];
        let checker = (arr: boolean[]) => arr.every((v) => v === true);
        values.brand !== "" && checkList.push(card.brand === values.brand);
        values.model !== "" && checkList.push(card.model === values.model);
        values.type !== "" && checkList.push(card.type === values.type);
        values.budget !== 0 && checkList.push(card.price <= values.budget);
        return checker(checkList);
      });
    });
  };
  const budgetCount = (count: number) => {
    setValues({ ...values, budget: count * 100000 });
  };
  const [serachTxt, setSearchTxt] = useState<string>("");
  const handleSeach = (e: React.BaseSyntheticEvent) => {
    setSearchTxt(e.target.value);
    setFilteredCards(() => {
      return tempData.filter(
        (data) =>
          data.brand.toLowerCase().includes(e.target.value.toLowerCase()) ||
          data.model.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
  };
  const [update, setUpdate] = useState<boolean>(false);
  useEffect(() => {
    if (type === "old") {
      carInfo.getOldCarCards(setTempData);
    } else {
      carInfo.getNewCarCards(setTempData);
    }
    if (sessionStorage.getItem("profile") !== null) {
      favouriteService.getFavourites(
        JSON.parse(sessionStorage.getItem("profile")!).email,
        setFavouriteCars
      );
      cartService.getCart(
        JSON.parse(sessionStorage.getItem("profile")!).email,
        setCarsInCart
      );
    }
  }, [type, update]);
  useEffect(() => {
    setFilteredCards(tempData);
  }, [tempData]);
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
    <div className="products-page">
      <div className="products-page__nav">
        <div className="df-ac">
          <Link to={"/"}>
            <HomeIcon className="color--green m-r-16 va-bo ft-sz-24" />
          </Link>
          <div className="product-page__search">
            <SearchIcon fontSize="small" className="cursor-pointer" />
            <input
              type="text"
              placeholder="Search by Brand / Model"
              value={serachTxt}
              onChange={handleSeach}
            />
          </div>
        </div>
        <div className="df-ac-je">
          <Link to="/profile">
            <PersonIcon className="ft-sz-24 color--purple" />
          </Link>
          <Link to="/cart" className="m-l-16">
            <ShoppingCartIcon className="color--blue" />
          </Link>
          <Link to="/favourites" className="m-l-16">
            <FavoriteIcon className="ft-sz-24 color--red " />
          </Link>
        </div>
      </div>
      <div className="products-page__products">
        {filteredCards.map((car) => (
          <CarCard
            key={car._id}
            handlePopup={() => {
              setOpen(!open);
              // @ts-ignore
              setCarData({
                ...car,
                imageUrls: imageData.filter(
                  (img) => img.UserId === car.sellerId
                ),
              });
            }}
            imageUrl={imageData.filter((data) => data.UserId === car.sellerId)}
            year={car.year}
            price={car.price}
            brand={car.brand}
            model={car.model}
            type={car.type}
            run={car.run}
            fuel={car.fuel}
            _id={car._id}
            favourite={favouriteCars.includes(car._id)}
            cart={carsInCart.includes(car._id)}
            setUpdate={setUpdate}
          />
        ))}
        {filteredCards.length === 0 && (
          <span className="unavailable">
            Product is currently not available
          </span>
        )}
      </div>
      <form className="products-page__filter" onSubmit={handleSubmit}>
        Brand
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
        Model
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
            carBrand === undefined ? [] : Collection.carBrands[carBrand].model
          }
        />{" "}
        Type
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
          <div className="df-ac-jb m-b-16 m-t-4">
            <div className="width-20">Year : </div>
            <input
              type="number"
              min={2000}
              max={new Date().getFullYear()}
              name="year"
              value={values.year}
              onChange={handleInput}
              className="input-styles width-80"
            />
          </div>
        )}
        <div>
          <p>Budget : {numberSeparator(values.budget)}</p>
          <Slider value={values.budget / 100000} onChange={budgetCount} />
        </div>
        <div className="df-ac-js m-t-16">
          <button type="submit" className="success-btn width-50">
            Apply filter
          </button>
          <button
            type="button"
            onClick={() => {
              setValues({ ...initialFilter });
              setFilteredCards(tempData);
            }}
            className="redirect-btn width-50"
          >
            Cancel
          </button>
        </div>
      </form>
      <Popup
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        heading="Details"
        data={
          <div className="product-popup">
            {carData.imageUrls.length > 0 ? (
              <Carousel showThumbs={false} className="m-b-16">
                {carData.imageUrls.map((img) => (
                  <div key={img._id}>
                    <img
                      src={img.Image}
                      alt="car"
                      style={{
                        maxWidth: "25em",
                        maxHeight: "18rem",
                        width: "auto",
                        height: "auto",
                      }}
                    />
                  </div>
                ))}
              </Carousel>
            ) : (
              <img src={test} alt="" />
            )}
            <strong>Description: {carData.description}</strong>
          </div>
        }
      />
    </div>
  );
};
