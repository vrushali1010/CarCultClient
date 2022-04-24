import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Assets/Logo.svg";
import { Navbar } from "./Navbar";
import { ToastContainer, toast } from "react-toastify";

export const LandingPage: React.FC = () => {
  const notify = (msg: string) => {
    toast.info(msg);
  };
  return (
    <div className="landing-page">
      <Navbar />
      <div className="landing-page__sec-1">
        <div className="sec-1__column-1">
          <div className="sec-1__heading">
            Buy and sell your car at best price
          </div>
          <div className="buying-selling-options">
            <Link to="/product-page/new" className="redirect-btn">
              Buy new car
            </Link>
            <Link to="/product-page/old" className="redirect-btn">
              Buy old car
            </Link>

            {sessionStorage.getItem("profile") ? (
              <>
                <Link to="/sell-car/new" className="redirect-btn">
                  Sell new car
                </Link>
                <Link to="/sell-car/old" className="redirect-btn">
                  Sell old car
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => notify("Plz login first")}
                  className="redirect-btn ft-sz-16"
                >
                  Sell new car
                </button>
                <button
                  onClick={() => notify("Plz login first")}
                  className="redirect-btn ft-sz-16"
                >
                  Sell old car
                </button>
              </>
            )}
          </div>
        </div>
        <img src={Logo} alt="" width="30%" />
      </div>
      <ToastContainer position="bottom-center" autoClose={1500} />
    </div>
  );
};
