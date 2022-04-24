import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { GoBack } from "../Components/GoBack";
import { Link, useNavigate } from "react-router-dom";

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const profile =
    sessionStorage.getItem("profile") === null
      ? null
      : //@ts-ignore
        JSON.parse(sessionStorage.getItem("profile"));
  return (
    <div className="profile-info">
      <GoBack />
      <div className="profile-info__card">
        <Link to="/site-data">
          <PersonIcon className="profile-icon" />
        </Link>
        {profile === null ? (
          <div>
            <h1>Plz sign in first</h1>
            <div className="df-ac-jb">
              <button
                className="m-t-16"
                onClick={() => {
                  navigate("/sign-up");
                }}
              >
                Sign-up
              </button>
              <button
                className="m-t-16"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
            </div>
          </div>
        ) : (
          <div className="dfc-ac m-t-16 ft-sz-24">
            <strong>{profile.name}</strong>
            <strong>{profile.email}</strong>
            <button
              className="m-t-16"
              onClick={() => {
                sessionStorage.clear();
                navigate("/");
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
