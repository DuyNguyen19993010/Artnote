import React from "react";
//-------------------------------Context and hooks----------------------
import { useState, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { useForm } from "react-hook-form";
//-----------------------css import ------------------------------------
import "../../Styling/RoomList.css";
import DM from "./DrawingMode"
import axios from "axios";
const RoomList = (props) => {
  //User context
  const { user, setUser } = useContext(UserContext);
  const { Valid } = user;
  //List of rooms and function for selecting the current room
  const [roomList,SetRoomList] = useState([])
  const [selectedRoom,SelectRoom] = useState([])
  //-----------------------react form----------------
  
  const { register, handleSubmit, errors } = useForm();
  //Submit form
  const requestRoom = (data) => {
    console.log(data);
    // axios.get("http://localhost:8000/users/").then((res) => {
    //   console.log(res.data);
    // });
  };


  return (
    <div className="RoomList">
      {/* ------------------------Room list--------------------- */}
      <div className = "list">
        <form onSubmit={handleSubmit(requestRoom)}>
          <label>Join a room</label>
          <br />
          <input
            name="roomNo"
            type="text"
            ref={register({ required: true, minLength: 2 })}
          />
          <input type="submit" />      
          <br />  
        </form>
      </div>

      {/* ------------------------Drawing area--------------------- */}
      <div className = "drawing_area">
        <DM/>
      </div>
    </div>
  );
};

export default RoomList;
