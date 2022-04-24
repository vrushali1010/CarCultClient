import React, { BaseSyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { Popup } from "../Components/Popup";
import { auth } from "../Service/Service";

export const Navbar: React.FC = () => {
  const profile = sessionStorage.getItem("profile");
  const [open, setOpen] = useState<boolean>(false);
  const [activeFeedback, setActiveFeedback] = useState<number>(-1);
  const [feedback, setFeedback] = useState<string>("");

  const handleFeedback = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const data = { feedback, rating: activeFeedback };
    auth.sendFeedback(data);
  };

  return (
    <div className="navbar">
      <div className="nav-box">
        <div className="df-ac">
          <button
            className="ft-sz-16"
            onClick={() => {
              setOpen(true);
            }}
          >
            Feedback
          </button>
          {profile && (
            <Link to="/my-order" className="ft-sz-16 color--black">
              | My orders
            </Link>
          )}
        </div>
        {profile ? (
          <Link to="/profile">
            <PersonIcon className="ft-sz-24" />
          </Link>
        ) : (
          <div className="btns">
            <Link to="/sign-up" className="navbar__signup">
              Sign Up
            </Link>
            <Link to="/login" className="navbar__login">
              Log in
            </Link>
          </div>
        )}
      </div>
      <Popup
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        heading="Feedback"
        data={
          <form className="feedback" onSubmit={handleFeedback}>
            <span>We would like your feedback to improve our website</span>
            <span>What is your opinion of this page?</span>
            <div className="df-ac-je m-t-16 m-b-16">
              <button
                className={`remark hover-red ${
                  activeFeedback === 1 ? "bg-red" : ""
                }`}
                type="button"
                onClick={() => {
                  setActiveFeedback(1);
                }}
              >
                Bad
              </button>
              <button
                className={`remark hover-yellow m-l-16 m-r-16 ${
                  activeFeedback === 3 ? "bg-yellow" : ""
                }`}
                type="button"
                onClick={() => {
                  setActiveFeedback(3);
                }}
              >
                Average
              </button>
              <button
                className={`remark hover-green ${
                  activeFeedback === 5 ? "bg-green" : ""
                }`}
                type="button"
                onClick={() => {
                  setActiveFeedback(5);
                }}
              >
                Good
              </button>
            </div>
            <hr className="hr" />
            <span>Please leave your feedback below: </span>
            <textarea
              placeholder="Type your feedback"
              className="m-t-16"
              name="feedback"
              value={feedback}
              onChange={(e: BaseSyntheticEvent) => {
                setFeedback(e.target.value);
              }}
              cols={60}
              rows={5}
            />
            <button className="feeback-submit" type="submit">
              Submit
            </button>
          </form>
        }
      />
    </div>
  );
};
