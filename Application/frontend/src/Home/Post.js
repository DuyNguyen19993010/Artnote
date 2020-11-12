import React from "react";
import "../Styling/Post.css";
import {useHistory } from "react-router";
const Post = (props) => {
  //--------------------------------------------------------------------------------
  console.log(props.post.PostIs);
  const history = useHistory();
  const seePost = (e) => {
    history.push("/post/" + props.post.id);
  };
  return (
    <div className="Post">
      <img onClick={seePost} src={props.post.image} alt="image is not here" />
    </div>
  );
};

export default Post;
