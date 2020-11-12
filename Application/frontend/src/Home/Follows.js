import React from "react";
import {useContext } from "react";
import { UserContext } from "../Context/UserContext";
import Follow from "./Follow";
import "../Styling/Posts.css";
const Follows = (props) => {
  //User context
  const { user, setUser } = useContext(UserContext);
  //-----------------------Render all object---------------------------------------------------------
  return (
    <div className="Follows">
      {props.users.map((user) => {
        return <Follow user={user} />;
      })}
    </div>
  );
};

export default Follows;
