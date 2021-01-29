import React, { useEffect } from "react";
//-------------------------------Context and hooks----------------------
import { useState, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router";
//-----------------------------------Forms------------------------------
import RoomForm from "./RoomForm"
//-------------------------Routing-----------------------------
import { Link, NavLink,Route, Switch,useParams } from "react-router-dom";
//-----------------------css import ------------------------------------
import 'bootstrap/dist/css/bootstrap.min.css'
import "../../Styling/RoomList.css";
import axios from "axios";



const RoomList = (props) => {
  //User context
  const { user, setUser } = useContext(UserContext);
  const { Valid } = user;
  const [roomList,SetRoomList]= useState([]);
  let {filter} = useParams()
  //useHistory
  const history = useHistory();
  //-----------------------react form----------------
  const { register, handleSubmit, errors } = useForm();
  //Submit form
  const requestRoom = (data) => {
    console.log(data);
  };
  console.log(roomList)
  //Show RoomCreate form
  const [showForm,toggleForm] = useState() 
  //-----------------------Set data for roomlist-----------------------
  useEffect(()=>{
    if(filter == "Joined"){
      axios.get("http://localhost:8000/api/room/",{headers:{'Authorization':"Token "+user.token,'Content-Type':'false','process-data':'false'}}).then((res) => {
        SetRoomList(res.data)
      }).catch(error=>{
          history.push("/")
      });       
    }
    else{
      axios.get("http://localhost:8000/api/room/",{headers:{'Authorization':"Token "+user.token,'Content-Type':'false','process-data':'false'}}).then((res) => {
        SetRoomList(res.data)
      }).catch(error=>{
          history.push("/")
      });   
      
    }
    },[filter])

  return (
    <div className="Rooms">
        {showForm? (<div className = "RoomForm">
          <h1>Room Creation</h1>
          <img className="closeFormButton" onClick={()=>{toggleForm(false)}} src="https://img.icons8.com/fluent-systems-filled/48/000000/x.png"/>
          <RoomForm/>
        </div>) :(<div>
        </div>)}
        <div className="options">
        <img src="https://img.icons8.com/ios-filled/50/000000/menu-2.png"/>
        </div>
      <div className="Logo">
        <h1>Bring your art closer</h1>
      </div>

      {/* ---------------------search bar----------------------- */}
        <form className="search" onSubmit={handleSubmit(requestRoom)}>
          <input placeholder="Search a group"
            name="roomNo"
            type="text"
            ref={register({ required: true, minLength: 2 })}
          />
        </form>
        <br/>
        <div className="addRoomButton">
        <img onClick={()=>{toggleForm(true)}} src="https://img.icons8.com/cotton/64/000000/plus--v3.png"/>
        </div>
        {/* ------------------------------Fitler---------------------------- */}
      <nav className="filter">
        <NavLink  className='navlink' activeClassName='active_nav' to="/RoomList/Public" exact={true}>Public</NavLink>
        <NavLink  className='navlink' activeClassName='active_nav' to="/RoomList/Joined" exact={true}>Joined</NavLink>
      </nav>


      {/* ------------------------Render room----------------------- */}
      <div className="card-deck">
        {
          roomList.map((room,key)=>{
            return (<div key={key}  className="room card" id={"room_"+key} >
              {/* ------------NavLink used to go to room and set roomName parameter----- */}
              <NavLink to={"/Room/"+room.room_name}>
                <div className="roomNameBanner">
                <h3>{room.room_name}</h3>
                </div>
              </NavLink>
              <img className="card-img-top" src={room.roomBackground}/>
            </div>)
          })
        }
      </div>
    </div>
  );
};

export default RoomList;



{/* <div className = "list">
        <form onSubmit={handleSubmit(requestRoom)}>
          <label><h1>Join a room</h1></label>
          <br />
          <input
            name="roomNo"
            type="text"
            ref={register({ required: true, minLength: 2 })}
          />
          <input type="submit" />      
          <br />  
        </form>
      </div> */}