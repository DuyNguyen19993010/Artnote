import React from "react";
import { useState, useContext } from "react";
import { NavLink, Link, Route, BrowserRouter, Switch } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import Posts from "./Posts";
const Discovery = () => {
  //User context
  const { user, setUser } = useContext(UserContext);
  console.log(user);
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
      <h1>This is the Discovery</h1>
      <Posts posts={data} />
      <ul>
        {NonNewFeedFilters.map((filter) => {
          return (
            <li
              onClick={() => {
                chooseFilter(filter);
              }}
            >
              {filter}
            </li>
          );
        })}
      </ul>
      <h1>Chosen filter is :{chosenFilter}</h1>
    </div>
  );
};

export default Discovery;
