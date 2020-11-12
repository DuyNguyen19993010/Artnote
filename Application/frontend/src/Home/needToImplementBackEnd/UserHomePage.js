import React from "react";
import { useState,useEffect } from "react";
import { NavLink, Route,Switch } from "react-router-dom";
import { useParams} from "react-router";
import Posts from "./Posts";
import Follows from "../Follows";
export const UserHome = (props) => {
  const [user, setUser] = useState({
    ID: "",
    email: "",
    Valid: false,
  });
  //useParam to get query of what user to display
  const { userName } = useParams();
  //get user data from database and assign it to userInfo local variable
  const [userInfo, setInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    occupation: "",
    workingLocation: "",
    interests: [],
    aboutMe: "",
    preview: [],
    posts: [],
    artworks: [],
    followers: [],
    followings: [],
  });

  useEffect(() => {
    setInfo({
      ...userInfo,
      firstname: "john",
      lastname: "andy",
      email: "something@mail.com",
      occupation: "Jobless",
      workingLocation: "London",
      interests: ["illustration", "2D", "3D"],
      aboutMe:
        "i love artttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt",
      preview: [
        { id: 11, image: "/Resources/img11.jpg", PostIs: "Artwork" },
        { id: 12, image: "/Resources/img12.jpg", PostIs: "Artwork" },
        { id: 13, image: "/Resources/img13.jpg", PostIs: "Artwork" },
      ],
      posts: [
        { id: 1, image: "/Resources/img1.jpg", PostIs: "Post" },
        { id: 2, image: "/Resources/img2.jpeg", PostIs: "Post" },
        { id: 3, image: "/Resources/img3.jpg", PostIs: "Post" },
        { id: 4, image: "/Resources/img4.png", PostIs: "Post" },
        { id: 5, image: "/Resources/img5.jpg", PostIs: "Post" },
      ],
      artworks: [
        {
          id: 11,
          image: "/Resources/img11.jpg",
          PostIs: "Artwork",
          Price: "10",
        },
        {
          id: 12,
          image: "/Resources/img12.jpg",
          PostIs: "Artwork",
          Price: "10",
        },
        {
          id: 13,
          image: "/Resources/img13.jpg",
          PostIs: "Artwork",
          Price: "10",
        },
        {
          id: 14,
          image: "/Resources/img14.jpg",
          PostIs: "Artwork",
          Price: "10",
        },
        {
          id: 15,
          image: "/Resources/img15.jpg",
          PostIs: "Artwork",
          Price: "10",
        },
      ],
      followers: [
        {
          profilePic: "/Resources/img11.jpg",
          firstname: " ken",
          lastname: "Angel",
          aboutMe: "weqweqewdfcxsfc",
          preview: [
            {
              id: 11,
              image: "/Resources/img11.jpg",
              PostIs: "Artwork",
              Price: "10",
            },
            {
              id: 12,
              image: "/Resources/img12.jpg",
              PostIs: "Artwork",
              Price: "10",
            },
            {
              id: 13,
              image: "/Resources/img13.jpg",
              PostIs: "Artwork",
              Price: "10",
            },
          ],
        },
        {
          profilePic: "/Resources/img12.jpg",
          firstname: " shang",
          lastname: "Angel",
          aboutMe: "dsadasdasdasdasd",
          preview: [
            {
              id: 11,
              image: "/Resources/img11.jpg",
              PostIs: "Artwork",
              Price: "10",
            },
            {
              id: 12,
              image: "/Resources/img12.jpg",
              PostIs: "Artwork",
              Price: "10",
            },
            {
              id: 13,
              image: "/Resources/img13.jpg",
              PostIs: "Artwork",
              Price: "10",
            },
          ],
        },
      ],
      followings: [
        {
          profilePic: "/Resources/img11.jpg",
          firstname: " ben",
          lastname: "Angel",
          aboutMe: "weqweqewdfcxsfc",
          preview: [
            {
              id: 11,
              image: "/Resources/img11.jpg",
              PostIs: "Artwork",
              Price: "10",
            },
            {
              id: 12,
              image: "/Resources/img12.jpg",
              PostIs: "Artwork",
              Price: "10",
            },
            {
              id: 13,
              image: "/Resources/img13.jpg",
              PostIs: "Artwork",
              Price: "10",
            },
          ],
        },
        {
          profilePic: "/Resources/img12.jpg",
          firstname: " slang",
          lastname: "Angel",
          aboutMe: "dsadasdasdasdasd",
          preview: [
            {
              id: 11,
              image: "/Resources/img11.jpg",
              PostIs: "Artwork",
              Price: "10",
            },
            {
              id: 12,
              image: "/Resources/img12.jpg",
              PostIs: "Artwork",
              Price: "10",
            },
            {
              id: 13,
              image: "/Resources/img13.jpg",
              PostIs: "Artwork",
              Price: "10",
            },
          ],
        },
      ],
    });
  }, []);
  //3 preivew images for user homepage
  let previewImages;
  if (userInfo.preview) {
    previewImages = userInfo.preview.map((item, index) => {
      return <img className="previewImage" src="" alt={"image" + index} />;
    });
  }

  //All the posts
  let posts;
  if (userInfo.posts) {
    posts = userInfo.posts.map((item, index) => {
      return <img className="posts" src="" alt={"image" + index} />;
    });
  }

  //All the artwork
  let artworks;
  if (userInfo.artwork) {
    artworks = userInfo.artwork.map((item, index) => {
      return <img className="artwork" src="" alt={"image" + index} />;
    });
  }

  //All the follower
  let followers;
  if (userInfo.followers) {
    followers = userInfo.followers.map((item, index) => {
      return <img className="follower" src="" alt={"image" + index} />;
    });
  }

  //All the follower
  let followings;
  if (userInfo.followings) {
    followings = userInfo.followings.map((item, index) => {
      return <img className="following" src="" alt={"image" + index} />;
    });
  }

  console.log(userInfo);

  //type needed to be changed linked to database later
  const [type, setType] = useState([
    "All",
    "illustration",
    "Character design",
    "Fantasy",
    "Game Art",
    "Concept Art",
    "Anime & Manga",
  ]);
  //Chosen type
  const [chosenType, chooseType] = useState(type[0]);

  //-------------------------------------------------------------------------------------------------------
  return (
    <div className="UserHome">
      <h1>This is the user homepage</h1>
      <div className="BannerBar">
        <h2 className="Banner">Artstation</h2>
      </div>
      <div className="mainBody">
        <img alt="user profile picture" />
        <h2>{userInfo.firstname + " " + userInfo.lastname}</h2>
        <h3>{userInfo.occupation}</h3>
        <h3>{userInfo.aboutMe}</h3>
        {previewImages}
        <nav className="UserPages">
          <NavLink to={"/UserHomePage/" + userName + "/Gallery"}>
            {" "}
            Gallery
          </NavLink>
          <NavLink to={"/UserHomePage/" + userName + "/Shop"}>Shop</NavLink>
          <NavLink to={"/UserHomePage/" + userName + "/Follower"}>
            {" "}
            Follower
          </NavLink>
          <NavLink to={"/UserHomePage/" + userName + "/Following"}>
            Following
          </NavLink>
          <NavLink to={"/UserHomePage/" + userName + "/Blog"}>Blog</NavLink>
        </nav>
        {/* --------------------------Type list---------------------------- */}
        <ul className="typeList">
          {type.map((type) => {
            return (
              <li>
                <h2
                  onClick={(event) => {
                    chooseType(type);
                  }}
                >
                  {type}
                </h2>
              </li>
            );
          })}
        </ul>
        {/*---------------------------------Posts--------------------------*/}
        <Switch>
          <Route path={"/UserHomePage/:userName/Gallery"}>
            <Posts posts={userInfo.posts} />
          </Route>
          <Route path={"/UserHomePage/:userName/Shop"}>
            <Posts posts={userInfo.artworks} />
          </Route>
          <Route path={"/UserHomePage/:userName/Follower"}>
            <Follows users={userInfo.followers} />
          </Route>
          <Route path={"/UserHomePage/:userName/Following"}>
            <Follows users={userInfo.followings} />
          </Route>
        </Switch>
      </div>
    </div>
  );
};
export default UserHome;
