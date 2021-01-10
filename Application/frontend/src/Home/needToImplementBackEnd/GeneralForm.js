import React from "react";
import { useState, useContext } from "react";
import { NavLink, Link, Route, BrowserRouter, Switch } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { useHistory, useLocation } from "react-router";
import { useForm } from "react-hook-form";
import Register from "./Register";
import Login from "./Login";
import axios from "axios";
const GeneralForm = (props) => {
  //User context
  const { user, setUser } = useContext(UserContext);
  const { Valid } = user;
  const [showLogin, toggle] = useState(true);
  const changeForm = () => {
    if (showLogin) {
      toggle(false);
    } else {
      toggle(true);
    }
  };
  const active = {
    fontSize: "50px",
    color: "#CD60BB",
    cursor: "pointer",
  };
  const inactive = {
    color: "#9E9A9D",
    cursor: "pointer",
  };
  return (
    <div className="Form">
      <div>
        <div>
          
          {
            Valid? (<h1 style={showLogin ? active : inactive} onClick={()=>{
              axios.get("http://localhost:8000/logout_view/").then((res)=>{
                if(!res.data.login){
                  console.log('loggout')
                  setUser({ ...user, Valid: false, ID: null });
                }
              })
            }}>
              {" "}
              Log out{" "}
            </h1> ) : (<h1 style={showLogin ? active : inactive} onClick={changeForm}>
              {" "}
              Login{" "}
            </h1>)
          }

          <h1 style={!showLogin ? active : inactive} onClick={changeForm}>
            Register
          </h1>
        </div>
        <div>{showLogin ? (Valid? (<span></span>) : <Login/>) : <Register />}</div>
      </div>
    </div>
  );
};

export default GeneralForm;
