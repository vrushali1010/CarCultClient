import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoBack } from "../Components/GoBack";
import { useForm } from "../Components/UseForm";
import { auth } from "../Service/Service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const notify = (msg: string) => toast.success(msg);
  const loginValues = {
    email: "",
    password: "",
  };
  const { values, handleInput } = useForm(loginValues);
  const handleSubmit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    auth.login(values, navigate, notify);
  };
  return (
    <div className="signup-page">
      <GoBack />
      <div className="signup-page__col-1">
        <Link to="/sign-up" className="col-1__btn">
          Don't have account visit Signup page - Click here
        </Link>
      </div>
      <div className="signup-page__col-2">
        <form
          onSubmit={handleSubmit}
          className="sign-up__form"
          style={{ height: "50%" }}
        >
          <div className="input-box">
            <div className="dfc-ac-jc m-b-16">
              <div className="sign-up__form-heading">Log In</div>
            </div>
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
            <label htmlFor="password" className="m-b-8 m-t-16">
              Password
            </label>
            <input
              className="input-styles"
              type="password"
              name="password"
              value={values.password}
              onChange={handleInput}
            />
            <button className="forget-pass" type="button">
              Forget password?
            </button>
          </div>
          <button className="success-btn width-100" type="submit">
            Login
          </button>
        </form>
      </div>
      <ToastContainer position="bottom-center" autoClose={1500} theme="dark" />
    </div>
  );
};
