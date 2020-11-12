import React from "react";
import {useContext } from "react";
import { UserContext } from "../Context/UserContext";
import Comment from "./Comment";
import "../Styling/Posts.css";
const Comments = (props) => {
  //User context
  const { user, setUser } = useContext(UserContext);
  //-----------------------Render all object---------------------------------------------------------
  return (
    <div className="Comments">
      {props.comments.map((comment) => {
        return <Comment comment={comment} />;
      })}
    </div>
  );
};

export default Comments;
