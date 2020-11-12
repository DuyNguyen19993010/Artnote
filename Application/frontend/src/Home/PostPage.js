import React from "react";
import { useState, useEffect } from "react";
import "../Styling/Post.css";
import { NavLink} from "react-router-dom";
import {useParams } from "react-router";
import Posts from "./needToImplementBackEnd/Posts";
import Comments from "./Comments";
const PostPage = (props) => {
  //--------------------------------------------------------------------------------
  const { id } = useParams();
  //Get post info and its user
  const [postInfo, setPostInfo] = useState({
    user: {
      id: null,
      firstname: "",
      lastname: "",
      preview: [],
    },
    post: {},
    comments: [],
  });
  useEffect(() => {
    setPostInfo({
      user: {
        id: 1,
        firstname: "john",
        lastname: "andy",
        preview: [
          { id: 11, image: "/Resources/img11.jpg", PostIs: "Post" },
          { id: 12, image: "/Resources/img12.jpg", PostIs: "Post" },
          { id: 13, image: "/Resources/img13.jpg", PostIs: "Post" },
        ],
      },
      post: {
        id: 1,
        image: "/Resources/img1.jpg",
        summary: "Good morning everyone",
        PostIs: "Artwork",
        price: 29.99,
        file: ["somthing.pdf", "somthing.js"],
        like: 32,
        comment: 21,
        date: "22/10/2020",
      },
      comments: [
        {
          userId: 1,
          id: 10,
          profilePic: "/Resources/img11.jpg",
          lastname: "ken",
          firstname: "kenedy",
          comment: "i love this",
        },
        {
          userId: 2,
          id: 11,
          profilePic: "/Resources/img11.jpg",
          lastname: "ken",
          firstname: "kenedy",
          comment: "i love this",
        },
      ],
    });
  }, []);
  const [commentToAdd, setComment] = useState("");
  const addComment = () => {
    console.log(commentToAdd);
  };

  //Render the post based on its type(post or artwork for sale)
  const renderPost = () => {
    if (postInfo.post.PostIs == "Post") {
      return (
        <div className="post">
          <img width="300px" height="300px" src={postInfo.post.image} />
          <h4>Posted on {postInfo.post.date}</h4>
          <h2>{postInfo.post.summary}</h2>
          <label>{postInfo.post.like}</label>
          <button> Like</button>
          <label>{postInfo.post.comment}</label>
          <button> Comment</button>
          <button>Save</button>
          <button>
            {" "}
            <h1>Facebook</h1>
          </button>
          <button>
            {" "}
            <h1>Instagram</h1>
          </button>
        </div>
      );
    } else {
      return (
        <div className="post">
          <img width="300px" height="300px" src={postInfo.post.image} />
          <h4>Posted on {postInfo.post.date}</h4>
          <h1> {postInfo.post.price}</h1>
          <button>Add to cart</button>
          <h2>{postInfo.post.summary}</h2>
          <label>{postInfo.post.like}</label>
          <button> Like</button>
          <label>{postInfo.post.comment}</label>
          <button> Comment</button>
          <button>Save</button>
          <button>
            {" "}
            <h1>Facebook</h1>
          </button>
          <button>
            {" "}
            <h1>Instagram</h1>
          </button>
        </div>
      );
    }
  };
  //   let Comments;
  // if(postInfo.comments){
  //     Comments = postInfo.comments
  // }
  return (
    <div className="PostPage">
      <nav className="nav">
        <NavLink to="/">New Feed</NavLink>
        <NavLink to="/Discovery">Discovery</NavLink>
        <NavLink to="/Market">Market</NavLink>
        <NavLink to="/MusicMovie">Music/Movie</NavLink>
      </nav>
      <div className="body">
        <div className="postInfo">
          {/*---------------The post----------------------*/}
          {renderPost()}
          <br />
          {/*---------------User that owns the post----------------------*/}
          <div className="user">
            <h1>More of the artist</h1>
            <img width="100px" height="100px" src={postInfo.user.profilePic} />
            <button>Follow +</button>
            <h1>
              {postInfo.user.firstname} {postInfo.user.lastname}
            </h1>
            <h2>Gallery</h2>
            <Posts posts={postInfo.user.preview} />
          </div>
        </div>
        <br />
        {/*---------------Comments belong to the post----------------------*/}
        <input
          type="text"
          placeholde="Comment something !"
          value={commentToAdd}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <button onClick={addComment}>Add comment</button>
        <div className="comment">
          <Comments comments={postInfo.comments} />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
