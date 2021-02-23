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
// -----------Axios-----------------
import axios from "axios";
//---------------------------------Start websocket--------------------

const Room = (props) => {  
  //-----------------------------Room Name--------------------------------
  const {roomID} = useParams();
  const [roomName, SetRoomName]= useState("");
  useEffect(()=>{
    axios.get("http://localhost:8000/api/room_get/"+roomID+"/").then((resp) => {
          console.log(resp.data);
          SetRoomName(resp.data.room_name)
          props.setRegStage(true)
        }).catch(er=>{
          console.log(er)
        })
  },[])

  //-------------------------Handle drawing and messaging-----------------------------
  return (
    <div className="Room">
    {/* --------Room Name--------------- */}
      <h1>Room: {roomName}</h1>
      <NavLink  className='navlink' activeClassName='active_nav' to="/" exact={true}>Back to Home</NavLink>
      {/* -------------------------ChatBox--------------------------- */}
      <div id="ChatBox-wrapper">
        <ChatBox roomID={roomID}/>
      </div>
      {/* -----------------Drawing mode---------------- */}
      <DrawingMode roomID={roomID}/>
    </div>
  );
};

export default Room;
