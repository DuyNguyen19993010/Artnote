import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import Posts from "./needToImplementBackEnd/Posts";
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
  ]);
  //--------------------------------------------------------------------------------
  return (
    <div className="NewFeed">
      <h1>This is the NewFeed</h1>
      <Posts posts={data} />
      <h1>Chosen type is {props.type}</h1>
      <ul>
        {NewFeedFilters.map((filter) => {
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

export default NewFeed;
