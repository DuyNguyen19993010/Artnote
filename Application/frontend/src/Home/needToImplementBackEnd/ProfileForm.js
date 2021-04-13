import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { NavLink, Link, Route, BrowserRouter, Switch } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../Context/UserContext";
import { useForm } from "react-hook-form";
import "../../Styling/form.css";
import axios from "axios";
const ProfileForm = (props) => {
  //User context
  const { user, setUser } = useContext(UserContext);
  const { Valid } = user;
  const {profile} = user;
  const {username} = user;
  //Profile pic
  const [pic,setPic] = useState()   
  //useHistory
  const  history  = useHistory();
  //use location
  const { pathname } = useLocation();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data)
    let formData = new FormData()
    formData.append('fname',data.fname)
    formData.append('lname',data.lname)
    formData.append('location',data.location)
    formData.append('occupation',data.occupation)
    formData.append('aboutMe',data.aboutMe)  
    formData.append('profile_pic',pic)
    formData.append('user',user.ID)
    axios.post("http://localhost:8000/api/profile/",formData,{headers:{'Authorization':"Token "+user.token,'Content-Type':'false','process-data':'false'}}).then((res) => {
      axios.get("http://localhost:8000/api/profile_get/"+user.ID+"/").then(resp=>{
        setUser({ ...user, Valid: true,profile:resp.data.profile ,ID:resp.data.user.id,username:resp.data.user.username});
        console.log(user)
        history.push('/Home/')
        })
    }).catch(error=>{
      console.error(error)
    });
  };



  return (
    <div className="Profile-initial">
      <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
        <label>First Name</label>
        <input name="fname" type="text" ref={register} />
        <br />

        <label>Last Name</label>
        <input name="lname" type="text" ref={register} />
        <br />

        <label>Occupation</label>
        <input name="occupation" type="text" ref={register} />

        <br />

        <label>Location</label>
        <input name="location" type="text" ref={register} />

        <br />

        <label>About me:</label>
        <input name="aboutMe" type="textarea" ref={register} />

        <br />

        <label>Profile images</label>
        <input
          onChange = {evt =>{setPic(evt.target.files[0])}}
          name="profile_pic"
          type="file"
          ref={register({ required: true })}
        /> 
        <input type="submit" />
      </form>
    </div>
  );
};

export default ProfileForm;
