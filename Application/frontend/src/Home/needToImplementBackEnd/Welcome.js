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
import ProfileForm from "./ProfileForm"
//------------------CSS---------------------
import "../../Styling/Welcome.css";
const Welcome = (props) => {
    //User context
    const { user, setUser } = useContext(UserContext);
    const { Valid } = user;
    //Display 2nd registration stage if register successfully  
    const [showRegStage,setRegStage]  = useState(false)

    const secondStageReg = (value)=>{
        setRegStage(value)
    }
    const showUser = ()=>{
        console.log(user)
    } 
  return (
    <div className="welcome">
        <div className = "banner">
            <h1> Welcome to ArtNote</h1>
        </div>
        <div className = "Account-area">
                {!showRegStage? (<div className ="Form"><div className ="RegisterForm">
                    <h1 className="FormName">Register</h1>
                    <Register setRegStage= {secondStageReg}/>
                </div>
                <div className= "verticalLine"></div> 
                <div className ="LoginForm">
                    <h1 className="FormName">Log in</h1>
                    <Login/>
                </div></div>):(<div className ="RegFormSec Form">
                        <div className ="RegisterSecForm">
                    <h1 className="FormName">Your information</h1>
                    <ProfileForm />
                </div>
                </div>)}

        </div>
    </div>
  );
};

export default Welcome;
