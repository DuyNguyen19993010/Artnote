import React from "react";
import "../Styling/Post.css";
const Follow = (props) => {
  //--------------------------------------------------------------------------------
  let followPreviewPic;
  if (props.user.preview) {
    console.log(props);
    followPreviewPic = props.user.preview.map((image, index) => {
      return <img src="" alt="Pic not found" />;
    });
  }
  return (
    <div className="Follow">
      <img src="" alt="profile pic" />
      <h1>{props.user.firstname + props.user.lastname}</h1>
      <h1>{props.user.aboutMe}</h1>
      {followPreviewPic}
      <br />
    </div>
  );
};

export default Follow;
