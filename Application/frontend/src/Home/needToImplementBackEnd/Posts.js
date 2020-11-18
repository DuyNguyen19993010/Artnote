import React from "react";
import { useState, useContext } from "react";
import { NavLink, Link, Route, BrowserRouter, Switch } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import Post from "../Post";
import "../../Styling/Posts.css";
const Posts = (props) => {
  //User context
  const { user, setUser } = useContext(UserContext);
  //-----------------------Render all object---------------------------------------------------------
  return (
    <div className="Posts">
      <div className="card-deck">
        {props.posts.map((post) => {
          return (<div className="card">
            
            {/* <img className="card-img-top" src={post.image} alt="image is not here" /> */}
            
          
          </div>);
        })}
      </div>
    </div>
  );
};

export default Posts;
