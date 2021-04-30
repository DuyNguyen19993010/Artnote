import React from "react";
import { useState, useContext } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../Context/UserContext";
import { useForm } from "react-hook-form";
import "../../Styling/form.css";
import axios from "axios";
const RoomForm = (props) => {
  //User context
  const { user } = useContext(UserContext);
  //Profile pic
  const [pic,setPic] = useState()   
  //useHistory
  const  history  = useHistory();
  //use location
  const { register, handleSubmit} = useForm();

  const onSubmit = (data) => {
    console.log(data)
    let formData = new FormData()
    formData.append('room_name',data.room_name)
    formData.append('roomBackground',pic)
    formData.append('host',user.ID)
    axios.post("http://localhost:8000/api/room/",formData,{headers:{'Authorization':"Token "+user.token,'Content-Type':'false'}}).then((res) => {
      alert("Room created ")
      history.push('/RoomList/Joined')
      props.closeForm(false)
    }).catch(error=>{
        console.log(error)

    });
  };



  return (
    <div className="Room-Form">
      <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
        <label>Room name: </label>
        <input name="room_name" type="text" ref={register} />
        <br />

        <label>Background cover: </label>
        <input
          onChange = {evt =>{setPic(evt.target.files[0])}}
          name="roomBackground"
          type="file"
          ref={register({ required: true })}
        /> 
        <br />
        <input className="submitButton" type="submit" />
      </form>
    </div>
  );
};

export default RoomForm;
