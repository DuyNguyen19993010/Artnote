import React from "react";
import "../Styling/Post.css";
import { NavLink,Route, Switch } from "react-router-dom";
const Post = (props) => {
  console.log(props)
  return (
    <div className={"post-"+props.type+"-wrapper"}>
      <div className="post-author-wrapper">
        <NavLink to={"/user/"+props.post.user.user.id}>
          <div className="profile_pic_wrapper"><img src={"http://localhost:8000"+props.post.user.profile_pic}/></div>
          <p className="header">{props.post.user.user.username}</p>
        </NavLink>
      </div>
      <div className="post-image-wrapper">
        <NavLink to={"/post/"+props.post.id}><img src={"http://localhost:8000"+props.post.image} alt="image is not here" /></NavLink>
      </div>
    </div>
  );
};

export default Post;
