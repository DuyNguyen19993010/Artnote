import React from "react";
import { useState, useContext } from "react";
import { NavLink, Link, Route, BrowserRouter, Switch } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import Posts from "./Posts";
const Market = () => {
  //User context
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  //Filters
  const NonNewFeedFilters = ["Trending", "Latest", "Following"];
  const [chosenFilter, chooseFilter] = useState(NonNewFeedFilters[0]);
  //Data from database to be implemented with backend
  const [data, setData] = useState([
    { image: "/Resources/img11.jpg", PostIs: "Artwork", Price: "10" },
    { image: "/Resources/img12.jpg", PostIs: "Artwork", Price: "10" },
    { image: "/Resources/img13.jpg", PostIs: "Artwork", Price: "10" },
    { image: "/Resources/img14.jpg", PostIs: "Artwork", Price: "10" },
    { image: "/Resources/img15.jpg", PostIs: "Artwork", Price: "10" },
  ]);
  //--------------------------------------------------------------------------------
  return (
    <div className="Market">
      <h1>This is the Market</h1>
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

export default Market;
