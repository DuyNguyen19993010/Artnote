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
      {props.posts.map((post) => {
        return <Post post={post} />;
      })}
    </div>
  );
};

export default Posts;
