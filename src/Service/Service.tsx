import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { CarDataInterface, SignupInterface } from "../Models/ServiceModels";

export const auth = {
  signup(
    data: SignupInterface,
    navigate: NavigateFunction,
    notify: (msg: string) => React.ReactText
  ) {
    axios
      .post(`${process.env.REACT_APP_API_KEY}/register`, data)
      .then((res) => {
        notify("Signed in successfully !");
        setTimeout(() => {
          navigate("/");
        }, 1500);
        sessionStorage.setItem("profile", JSON.stringify(res.data));
      })
      .catch((err: any) => {
        notify(err.response.data);
      });
  },
  login(
    data: SignupInterface,
    navigate: NavigateFunction,
    notify: (msg: string) => React.ReactText
  ) {
    axios
      .post(`${process.env.REACT_APP_API_KEY}/login`, data)
      .then((res) => {
        notify("Logged in successfully !");
        setTimeout(() => {
          navigate("/");
        }, 1500);
        sessionStorage.setItem("profile", JSON.stringify(res.data));
      })
      .catch((err: any) => {
        notify(err.response.data);
      });
  },
  getSiteData(setData: any) {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/get-site-data`)
      .then((res) => setData(res.data))
      .catch((err: any) => console.error(err));
  },
  sendFeedback(data: { feedback: string; rating: number }) {
    axios
      .post(`${process.env.REACT_APP_API_KEY}/feedback`, data)
      .then(() => console.log("here"))
      .catch((err: any) => console.error(err));
  },
};

export const carInfo = {
  getNewCarCards(setCarState: any) {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/buy-new-car`)
      .then((res) => setCarState(res.data))
      .catch((err: any) => {
        console.error(err);
      });
  },
  getOldCarCards(setCarState: any) {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/buy-old-car`)
      .then((res) => setCarState(res.data))
      .catch((err: any) => {
        console.error(err);
      });
  },
  sellCar(data: CarDataInterface, navigate: NavigateFunction) {
    axios
      .post(`${process.env.REACT_APP_API_KEY}/sell-car`, data)
      .then(() => navigate("/"))
      .catch((err: any) => console.error(err));
  },
  addToCart(data: { id: string; email: string }) {
    axios
      .post(`${process.env.REACT_APP_API_KEY}/add-to-cart`, data)
      .then()
      .catch((err: any) => console.error(err));
  },
};

export const favouriteService = {
  addToFavourites(data: { id: string; email: string }, setUpdate: any) {
    axios
      .post(`${process.env.REACT_APP_API_KEY}/add-to-favourite`, data)
      .then(() => setUpdate((prevValue: boolean) => !prevValue))
      .catch((err: any) => console.error(err));
  },
  getFavourites(email: string, setFavouriteCars: any) {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/favourite-cars/${email}`)
      .then((res) => setFavouriteCars(res.data))
      .catch((err: any) => {
        console.error(err);
      });
  },
  getFaouriteCars(email: string, setFavouriteCars: any) {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/get-favorite-cars/${email}`)
      .then((res) => setFavouriteCars(res.data))
      .catch((err: any) => {
        console.error(err);
      });
  },
};

export const cartService = {
  addToCart(data: { id: string; email: string }, setUpdate: any) {
    axios
      .post(`${process.env.REACT_APP_API_KEY}/add-to-cart`, data)
      .then(() => setUpdate((prevValue: boolean) => !prevValue))
      .catch((err: any) => console.error(err));
  },
  addToBuy(data: { id: string; email: string }, setUpdate: any) {
    axios
      .post(`${process.env.REACT_APP_API_KEY}/add-to-buy`, data)
      .then(() => setUpdate((prevValue: boolean) => !prevValue))
      .catch((err: any) => console.error(err));
  },
  getCart(email: string, setCart: any) {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/cart/${email}`)
      .then((res) => setCart(res.data))
      .catch((err: any) => {
        console.error(err);
      });
  },
  getCartCars(email: string, setCart: any) {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/get-cart-cars/${email}`)
      .then((res) => setCart(res.data))
      .catch((err: any) => {
        console.error(err);
      });
  },
};

export const orderService = {
  getBuylist(_id: string, setBuy: any) {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/get-buy-list/${_id}`)
      .then((res) => setBuy(res.data))
      .catch((err: any) => console.error(err));
  },
  getSelllist(_id: string, setSell: any) {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/get-sell-list/${_id}`)
      .then((res) => setSell(res.data))
      .catch((err: any) => console.error(err));
  },
  updateCar(_id: string, data: { price: number }, setUpdate: any) {
    axios
      .patch(`${process.env.REACT_APP_API_KEY}/update-car/${_id}`, data)
      .then(() => setUpdate((prevValue: boolean) => !prevValue))
      .catch((err: any) => console.error(err));
  },
};
