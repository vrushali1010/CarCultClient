import React from "react";
import { useNavigate } from "react-router-dom";
import { GoBack } from "../Components/GoBack";
import { useForm } from "../Components/UseForm";
import * as Service from "../Service/Service";
import { ToastContainer, toast } from "react-toastify";

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const notify = (msg: string) => toast.success(msg);
  const signupValues = {
    name: "",
    email: "",
    password: "",
    favouriteCars: [],
  };
  const { values, handleInput } = useForm(signupValues);
  const handleSubmit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    Service.auth.signup(values, navigate, notify);
  };
  return (
    <div className="signup-page">
      <GoBack />
      <div className="signup-page__col-1">
        <button className="col-1__btn">Sign up with Google</button>
        <button className="col-1__btn">Sign up with Twitter</button>
        <button className="col-1__btn">Sign up with Facebook</button>
      </div>
      <div className="signup-page__col-2">
        <form onSubmit={handleSubmit} className="sign-up__form">
          <div className="input-box">
            <div className="dfc-ac-jc m-b-16">
              <div className="sign-up__form-heading">Sign Up</div>
              <div className="sign-up__form-sub-heading">
                Get started absolutely free
              </div>
            </div>
            <label htmlFor="email" className="m-b-8">
              Name
            </label>
            <input
              className="input-styles"
              type="text"
              name="name"
              value={values.name}
              onChange={handleInput}
            />
            <label htmlFor="email" className="m-b-8">
              Email
            </label>
            <input
              className="input-styles"
              type="text"
              name="email"
              value={values.email}
              onChange={handleInput}
            />
            <div className="input-box">
              <label htmlFor="password" className="m-b-8">
                Password
              </label>
              <input
                className="input-styles"
                type="password"
                name="password"
                value={values.password}
                onChange={handleInput}
              />
            </div>
          </div>
          <button className="success-btn width-100" type="submit">
            Sign up !
          </button>
        </form>
      </div>{" "}
      <ToastContainer position="bottom-center" autoClose={1500} theme="dark" />
    </div>
  );
};
