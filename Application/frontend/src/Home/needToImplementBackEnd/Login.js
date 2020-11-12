import React from "react";
import { useState, useContext } from "react";
import { NavLink, Link, Route, BrowserRouter, Switch } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { useHistory, useLocation } from "react-router";
import { useForm } from "react-hook-form";
import "../../Styling/form.css";
import axios from "axios";
const Login = (props) => {
  //User context
  const { user, setUser } = useContext(UserContext);
  const { Valid } = user;
  //useHistory
  const { history } = useHistory();
  //use location
  const { pathname } = useLocation();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    setUser({ ...user, Valid: true, ID: 1 });
    // axios.post("http://localhost:8000/users/").then((res) => {
    //   console.log(res.data);
    // });
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <br />
        <input
          name="email"
          type="email"
          ref={register({ required: true, minLength: 2 })}
        />
        <br />
        <label>Password</label>
        <br />
        <input
          name="password"
          type="password"
          ref={register({ required: true, minLength: 2 })}
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Login;
