import React from "react";
import { useState, useContext } from "react";
import { NavLink, Link, Route, BrowserRouter, Switch } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../Context/UserContext";
import { useForm } from "react-hook-form";
import axios from "axios";
//-------------------Forms----------------------
import Register from "./Register"
import Login from "./Login"
//------------------CSS---------------------
import "../../Styling/Welcome.css";
const Welcome = (props) => {

  return (
    <div className="welcome">
        <div className = "banner">
            <h1> Welcome to ArtNote</h1>
        </div>
        <div className = "Account-area">
            <div className ="Form">
                <div className ="RegisterForm">
                    <h1 className="FormName">Register</h1>
                    <Register/>
                </div>
                <div className= "verticalLine"></div> 
                <div className ="LoginForm">
                    <h1 className="FormName">Log in</h1>
                    <Login/>
                </div>
                
            </div>

        </div>
    </div>
  );
};

export default Welcome;
