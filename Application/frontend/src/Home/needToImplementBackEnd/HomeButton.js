import React from "react";
import { useState,useEffect } from "react";
//Import axios
import axios from "axios";
//Parameter
import { useParams} from "react-router";
//CSS
import "../../Styling/HomeButton.css";
import { NavLink } from "react-router-dom";
export const HomeButton = (props) => {//-------------------------------------------------------------------------------------------------------
  return (
      <div className="home-button">
        <div className="gallery-button"> 
          <NavLink to="/Home/">
          <img src="https://img.icons8.com/metro/26/000000/activity-grid-2.png"/>
          </NavLink>
        </div>
        <div className="drawing-button"> 
          <NavLink to="/RoomList/Public">
            <img src="https://img.icons8.com/dotty/26/000000/flipboard--v2.png"/>
          </NavLink>
        </div>
      </div>
  );
};
export default HomeButton;
