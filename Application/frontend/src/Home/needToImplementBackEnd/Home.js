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
import Modal from 'react-bootstrap/Modal'
import { useForm } from "react-hook-form";
const Home = (props) => {
  const history = useHistory();
  //User context: user:{ID,email,Valid}
  const { user, setUser } = useContext(UserContext);
  const { Valid } = user;
  //Alert
  //form
  const { register, handleSubmit, errors } = useForm();
  //alert
  const alert = useAlert();
  //type needed to be changed linked to database later
  const [type, setType] = useState([]);
  //------------------------------Posts--------------------------------
  useEffect(() => {
    //-------------------Set available types-----------------------------
    setType([
      "All",
      "illustration",
      "Character design",
      "Fantasy",
      "Game Art",
      "Concept Art",
      "Anime & Manga",
    ])

  },[]);
  //search query to send to database
  const [query, setQuery] = useState("");
  const handleSendData = (data) => {
    console.log(data);
  };
  //user upload
  const upload = () => {
    history.push("/Upload");
  };

  //--------------------------------------------------------------------------------
  return (
    <div className="Home">
      <div className="GeneralForm-wrapper">
        <GeneralForm/>
      </div>
      {/*---------------------Banner-------------------------*/}
      <div className="BannerBar">
        <h2 className="Banner">ArtNote</h2>
      </div>
      {/*---------------------Search Bar------------------------*/}
      <form className="searchPost" onSubmit={handleSubmit(handleSendData)}>
          <input placeholder="Search"
            name="postName"
            type="text"
            ref={register({ required: true, minLength: 2 })}
          />
        </form>
      <br/>
      <div className="functionality card-deck">
      <NavLink className='function'to='/Upload'><h2>Upload</h2></NavLink>
      <NavLink className='function'to='/RoomList/Public'><h2>Draw and Connect</h2></NavLink>
      <NavLink className='function'to='/'><h2>Login</h2></NavLink>
        {/* <NavLink className='upload'to='/Upload'><h2>Upload an image</h2></NavLink> */}
      </div>
      <br/>

      {/*----------------------------Type-------------------------*/}
      <div className="typeList">
        {type.map((type) => {
          return (
            <div  className="type">
              <h2 style={{background:"url(https://cdna.artstation.com/p/assets/images/images/032/172/810/large/nerissa-mercer-lion.jpg?1605674363)"}} className="typeName">
                {type}
              </h2>
            </div>
          );
        })}
      </div>


      {/*---------------------Nav bar-------------------------*/}
      <nav className="nav">
        <NavLink className='navlink' activeClassName='active_nav' to="/" exact={true}><h2>New Feed</h2></NavLink>
        <NavLink className='navlink' activeClassName='active_nav' to="/Discovery"><h2>Discovery</h2></NavLink>
      </nav>
      {/*-------------------------MAIN BODY------------------------*/}
      <div className="mainBody">
        <Switch>
          {/*-------------------------Discovery------------------------*/}
          <Route path="/Discovery/:interest?" exact>
            <Discovery />
          </Route>
          {/*-------------------------New Feed------------------------*/}
          <Route path="/:interest?" exact>
            <NewFeed  />
          </Route>
        </Switch>
        {/*--------------------Check filter and type of post*/}
      </div>
    </div>
  );
};

export default Home;
