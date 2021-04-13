import React from "react";
import { useState,useEffect,useContext } from "react";
//Import  context
import { UserContext } from "../../Context/UserContext";
//Import axios
import axios from "axios";
//Parameter
import { useParams} from "react-router";
//CSS
import "../../Styling/UserHomePage.css";
import { NavLink } from "react-router-dom";
//Import component
import HomeButton from "./HomeButton"
export const UserHome = (props) => {
  const { user, setUser } = useContext(UserContext);
  //useParam to get query of what user to display
  const { user_id } = useParams();
  //get user data from database and assign it to userInfo local variable
  const [userInfo, setInfo] = useState();

  useEffect(() => {
    console.log(user)
    axios.get("http://localhost:8000/api/profile_get/"+user_id,{headers:{'Authorization':"Token "+user.token,'Content-Type':'false'}}).then((res) => {
      if(res.data.Message!="You are not authorized"){
        console.log(res.data)
        setInfo(res.data)
      }
      else{
        alert("You are not authorized")
      }
      
    })
  }, []);
  

  //-------------------------------------------------------------------------------------------------------
  return (
    <div className="UserHome">
      {/* <div className="home-button">
        <div className="gallery-button"> 
          <NavLink to="/Home/">
          <img src="https://img.icons8.com/metro/26/000000/activity-grid-2.png"/>
          </NavLink>
        </div>
        <div className="drawing-button"> 
          <NavLink to="/RoomList/Public">
            <img src="https://img.icons8.com/dotty/26/000000/flipboard--v2.png"/>
          </NavLink>
        </div>
      </div> */}
      <HomeButton/>
      {/* ------------------user info------------------- */}
      <div className="user-info-wrapper">
        <div className="profile-pic-wrapper">
          {userInfo?(<img src={"http://localhost:8000"+userInfo.profile.profile_pic} alt="No image"/>):(<div/>)}
        </div>
        {userInfo?(
          <div className="user-info">
            <p className="username">{userInfo.user.username}</p>
            <p className="full-name">{userInfo.profile.fname+" "+userInfo.profile.lname+" "}<img src="https://img.icons8.com/ios-filled/20/000000/name.png"/></p>
            <p className="location-occupation">{userInfo.profile.location}<img src="https://img.icons8.com/material-sharp/20/000000/worldwide-location.png"/>{", "+userInfo.profile.occupation+" "}<img src="https://img.icons8.com/ios-filled/20/000000/new-job.png"/></p>
            <p className="aboutMe-header"><img src="https://img.icons8.com/ios-filled/20/000000/checked-identification-documents--v1.png"/>About me:</p>
            <p className="aboutMe">{userInfo.profile.aboutMe}</p>
          </div>
        ):(<div/>)}
      </div>
      {/* ---------------------Posts------------------------- */}
      {userInfo?(
        <div className="posts-wrapper">
          {userInfo.posts.map((post,key)=>{
            return (<div key={key} className="post-wrapper"><img src={"http://localhost:8000"+post.image}/></div>)
          })}
        </div>
      ):(<div/>)}

      
    </div>
  );
};
export default UserHome;
