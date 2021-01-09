import React, { useEffect } from "react";
import "../Styling/Room.css";
import {useHistory } from "react-router";
import {useState,useContext} from "react";
import {w3cwebsocket} from "websocket"
//--------------------------Pages------------------------
import DrawingMode from "../Home/needToImplementBackEnd/DrawingMode";
import ChatBox from "./Chatbox";
//-------------------------Routing-----------------------------
import { Link, NavLink,Route, Switch,useParams } from "react-router-dom";
//---------------------------------Start websocket--------------------

const Room = (props) => {  
  //-----------------------------Room Name--------------------------------
  const {roomName} = useParams();

  //-------------------------Handle drawing and messaging-----------------------------
  return (
    <div className="Room">
    {/* --------Room Name--------------- */}
      <h1>Room: {roomName}</h1>
      <NavLink  className='navlink' activeClassName='active_nav' to="/" exact={true}>Back to Home</NavLink>
      {/* -------------------------ChatBox--------------------------- */}
      <div id="ChatBox-wrapper">
        <ChatBox roomName={roomName}/>
      </div>
      {/* -----------------Drawing mode---------------- */}
      <DrawingMode/>
    </div>
  );
};

export default Room;
