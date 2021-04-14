import React from "react";
import "../../Styling/Posts.css";
const Posts = (props) => {
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
