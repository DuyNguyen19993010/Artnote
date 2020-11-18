import React from "react";
import { useState, useContext } from "react";
import { NavLink, Link, Route, BrowserRouter, Switch } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import Post from "../Post";
const Discovery = () => {
  //User context
  const { user, setUser } = useContext(UserContext);
  //Filters
  const NonNewFeedFilters = ["Trending", "Latest", "Following"];
  const [chosenFilter, chooseFilter] = useState(NonNewFeedFilters[0]);
  //Data from database to be implemented
  const [data, setData] = useState([
    { image: "/Resources/img20.jpg", PostIs: "Post" },
    { image: "/Resources/img22.jpg", PostIs: "Post" },
    { image: "/Resources/img23.jpg", PostIs: "Post" },
    { image: "/Resources/img24.jpg", PostIs: "Post" },
    { image: "/Resources/img25.jpg", PostIs: "Post" },
  ]);
  //--------------------------------------------------------------------------------
  return (
    <div className="Discovery">
      <div className="card-deck">
        {data.map((post) => {
          return (<div className="card">
            <Post post={post}/>
          </div>);
        })}
      </div>
      
    </div>
  );
};

export default Discovery;
