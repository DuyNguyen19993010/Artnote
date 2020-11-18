import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import Posts from "./needToImplementBackEnd/Posts";
import Post from "./Post";
//-----------------------------CSS------------------------
import 'bootstrap/dist/css/bootstrap.min.css'
const NewFeed = (props) => {
  //User context
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  //Filter
  const NewFeedFilters = ["Trending", "Latest"];
  const [chosenFilter, chooseFilter] = useState(NewFeedFilters[0]);
  //Data of followings from database
  const [data, setData] = useState([
    { id: 1, image: "/Resources/img1.jpg", PostIs: "Post" },
    { id: 2, image: "/Resources/img2.jpeg", PostIs: "Post" },
    { id: 3, image: "/Resources/img3.jpg", PostIs: "Post" },
    { id: 4, image: "/Resources/img4.png", PostIs: "Post" },
    { id: 5, image: "/Resources/img5.jpg", PostIs: "Post" },
    { id: 5, image: "/Resources/img5.jpg", PostIs: "Post" },
    { id: 5, image: "/Resources/img5.jpg", PostIs: "Post" },
    { id: 5, image: "/Resources/img5.jpg", PostIs: "Post" },
    { id: 5, image: "/Resources/img5.jpg", PostIs: "Post" },
    { id: 5, image: "/Resources/img5.jpg", PostIs: "Post" },
    { id: 5, image: "/Resources/img5.jpg", PostIs: "Post" },
    { id: 5, image: "/Resources/img5.jpg", PostIs: "Post" },
    { id: 5, image: "/Resources/img5.jpg", PostIs: "Post" },
    { id: 5, image: "/Resources/img5.jpg", PostIs: "Post" },
    { id: 5, image: "/Resources/img5.jpg", PostIs: "Post" },
    { id: 5, image: "/Resources/img5.jpg", PostIs: "Post" },
    { id: 5, image: "/Resources/img5.jpg", PostIs: "Post" },
  ]);
  //--------------------------------------------------------------------------------
  return (
    <div className="NewFeed">
      {/* <Posts posts={data} /> */}
      <div className="card-deck">
        {data.map((post) => {
          return (
            <Post post={post}/>
          );
        })}
      </div>
    </div>
  );
};

export default NewFeed;
