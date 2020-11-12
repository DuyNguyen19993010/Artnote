import React from "react";
import "../Styling/Post.css";
import {useHistory } from "react-router";
const Comment = (props) => {
  //--------------------------------------------------------------------------------
  const history = useHistory();
  const seeUser = (e) => {
    history.push("/UserHomePage/" + props.comment.userId + "/Gallery");
  };
  //Comment structure
  //   {
  //     id: 1,
  //     profilePic: "/Resources/img11.jpg",
  //     lastname: "ken",
  //     firstname: "kenedy",
  //     comment: "i love this",
  //   }
  return (
    <div className="Post">
      <img
        height="30px"
        width="30px"
        onClick={seeUser}
        src={props.comment.profilePic}
        alt="image is not here"
      />
      <div>
        <h2>
          {props.comment.firstname} {props.comment.lastname}
        </h2>
        <h1>{props.comment.comment}</h1>
      </div>
    </div>
  );
};

export default Comment;
