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
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    let formData = new FormData()
    formData.append('username',data.username)
    formData.append('password',data.password)
    axios.post("http://localhost:8000/login_view/",formData).then((res) => {
      if(res.data.login){
        setUser({ ...user, Valid: true, ID: 1 });
      }
    });
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <br />
        <input
          name="username"
          type="text"
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
