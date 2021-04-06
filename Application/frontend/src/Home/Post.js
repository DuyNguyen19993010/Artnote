import React from "react";
import "../Styling/Post.css";
import { NavLink,Route, Switch } from "react-router-dom";
const Post = (props) => {
  return (
    <div className={"post-"+props.type+"-wrapper"}>
      <div className="post-author-wrapper">
        <div className="profile_pic_wrapper"><img src={props.post.user.profile_pic}/></div>
        <p className="header">{props.post.user.username}</p>
      </div>
      <div className="post-image-wrapper">
        <NavLink to={"/post/"+props.post.id}><img src={props.post.image} alt="image is not here" /></NavLink>
      </div>
    </div>
  );
};

export default Post;
