import React, { useEffect } from "react";
import {useHistory } from "react-router";
import {useState} from "react";
//--------------------------Pages------------------------
import DrawingMode from "../Home/needToImplementBackEnd/DrawingMode";
import ChatBox from "./Chatbox";
//-------------------------Routing-----------------------------
import {useParams } from "react-router-dom";
// -----------Axios-----------------
import axios from "axios";
// -------CSS----------
import "../Styling/Room.css";
//---------------------------------Start websocket--------------------

const Room = (props) => {  
  //History
  const  history  = useHistory();
  //-----------------------------Room Name--------------------------------
  const {roomID} = useParams();
  const [unMount,setMount] =useState(false) 
  const [roomName, SetRoomName]= useState("");
  useEffect(()=>{
    axios.get("http://localhost:8000/api/room_get/"+roomID+"/").then((resp) => {
          SetRoomName(resp.data.room_name)
          // props.setRegStage(true)
        }).catch(er=>{
          console.log(er)
        })
  },[])
  const leaveSession = (ws)=>{
    ws.current.close()
    history.push("/RoomList/Public/")
    // setMount(false)
  }

  //-------------------------Handle drawing and messaging-----------------------------
  return (
    <div className="Room">
      {/* <div className = "optionBar"> 

      </div>
      <div className = "toolBar"> 

      </div> */}
      {/* -------------------------ChatBox--------------------------- */}
      <div id="ChatBox-wrapper">
        <ChatBox roomID={roomID}/>
      </div>
      {/* -----------------Drawing mode---------------- */}
      <DrawingMode unMount={unMount} unMountFunction = {leaveSession} roomID={roomID}/>
  </div>
  );
};

export default Room;
