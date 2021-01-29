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
  const  history  = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    let formData = new FormData()
    formData.append('username',data.username)
    formData.append('password',data.password)
    axios.post("http://localhost:8000/auth/",formData).then((res) => {
      if(res.data){
        console.log(res.data)
        setUser({ ...user, Valid: true, token: res.data.token ,ID:res.data.id});
        history.push('/Home/')
      }
    }).catch(error =>{ 
      if(error.response.status == 400){
        alert("User does not exist or credentials are incorrect")
      }else if(error.response.status != 400 && error.response.status != 200){
        alert("Please log in")
      }       
    });
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Username: </label>
 
        <input
          name="username"
          type="text"
          ref={register({ required: true, minLength: 2 })}
        />
        <br />
        <label>Password: </label>
        <input
          name="password"
          type="password"
          ref={register({ required: true, minLength: 2 })}
        />
        <br />
        <input className="submitButton" type="submit" />
      </form>
    </div>
  );
};

export default Login;
