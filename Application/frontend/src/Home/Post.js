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
    <div className="Post card">
      <img className="card-img-top" src={props.post.image} alt="image is not here" />
    </div>
  );
};

export default Post;
