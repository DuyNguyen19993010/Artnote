import React from "react";
import { useState, useContext, useEffect } from "react";
import "../../Styling/Home.css";
import { NavLink,Route,Switch } from "react-router-dom";
import {useLocation, useHistory } from "react-router";
import { UserContext } from "../../Context/UserContext";
import NewFeed from "../NewFeed";
import Discovery from "./Discovery";
import GeneralForm from "./GeneralForm";
import { useAlert } from "react-alert";
const Home = (props) => {
  const history = useHistory();
  //User context: user:{ID,email,Valid}
  const { user, setUser } = useContext(UserContext);
  const { Valid } = user;
  //Alert
  const alert = useAlert();
  //type needed to be changed linked to database later
  const [type, setType] = useState([
    "All",
    "illustration",
    "Character design",
    "Fantasy",
    "Game Art",
    "Concept Art",
    "Anime & Manga",
    "Anime & Manga",
    "Anime & Manga",
    "Anime & Manga"
  ]);
  //Chosen type
  const [chosenType, chooseType] = useState(type[0]);
  //------------------------------Posts--------------------------------
  useEffect(() => {});
  //search query to send to database
  const [query, setQuery] = useState("");
  const handleSendData = (e) => {
    console.log(query);
  };
  //----------------renderLogin/Reg Form----------------------------
  const [showForm, toggleForm] = useState(false);
  const renderForm = () => {
    return (
      <div>
        <GeneralForm />
        <button
          onClick={() => {
            toggleForm(false);
          }}
        >
          X
        </button>
      </div>
    );
  };
  //Decide to render login or logout
  const renderLogin = () => {
    if (!Valid) {
      return (
        <button
          onClick={(e) => {
            toggleForm(true);
          }}
        >
          Login !
        </button>
      );
    } else {
      return (
        <button
          onClick={(e) => {
            setUser({ ...user, Valid: false });
          }}
        >
          Logout!
        </button>
      );
    }
  };
  //Login checking,render user profile and go to user homepage
  const toUserHomePage = () => {
    //********************KEEP USER'S ID but Replace with Username Later*******************************
    history.push("/UserHomePage/" + user.ID + "/Gallery");
    // history.push("/UserHomePage");
  };
  const renderUserProfile = () => {
    if (user.Valid) {
      return <button onClick={toUserHomePage}>Profile</button>;
    }
  };
  //user upload
  const upload = () => {
    history.push("/Upload");
  };

  //--------------------------------------------------------------------------------
  return (
    <div className="Home">
      <NavLink className='toDR'to='/Paint'>paint</NavLink>
      {/*---------------------Banner-------------------------*/}
      <div className="BannerBar">
        <h2 className="Banner">Artstation</h2>
        {renderLogin()}
        {renderUserProfile()}
        <button
          onClick={
            Valid
              ? upload
              : () => {
                  alert.show("Please sign in first");
                }
          }
        >
          Upload
        </button>
      </div>
      {/*---------------------Search Bar------------------------*/}
      <input
        type="text"
        placeholder="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <button onClick={handleSendData}>Search !</button>
      {/*---------------------Nav bar-------------------------*/}
      <nav className="nav">
        <NavLink className='navlink' activeClassName='active_nav' to="/" exact={true}>New Feed</NavLink>
        <NavLink className='navlink' activeClassName='active_nav' to="/Discovery">Discovery</NavLink>
      </nav>
      {/*----------------------------Type-------------------------*/}
      <div className="typeList">
        {type.map((type) => {
          return (
              <h2
                onClick={(event) => {
                  chooseType(type);
                }}
              >
                {type}
              </h2>
          );
        })}
      </div>
      {/*-------------------------MAIN BODY------------------------*/}
      <div className="mainBody">
        {showForm && user.Valid == false ? (
          renderForm()
        ) : (
          <h1>Form not displayed</h1>
        )}
        <Switch>
          {/*-------------------------Discovery------------------------*/}
          <Route path="/Discovery">
            <Discovery />
          </Route>
          {/*-------------------------New Feed------------------------*/}
          <Route path="/">
            <NewFeed type={chosenType} />
          </Route>
        </Switch>
        {/*--------------------Check filter and type of post*/}
      </div>
    </div>
  );
};

export default Home;
