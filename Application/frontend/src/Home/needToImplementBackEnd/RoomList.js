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
//Import component
import HomeButton from "./HomeButton"
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
  //Show RoomCreate form
  const [showForm,toggleForm] = useState() 
  //-----------------------Set data for roomlist-----------------------
  useEffect(()=>{
    if(filter == "Joined"){
      let formdata = new FormData()
      formdata.append('user',user.ID)
      axios.post("http://localhost:8000/api/joinedRoom/",formdata,{headers:{'Authorization':"Token "+user.token,'Content-Type':'false'}}).then((res) => {
        console.log(res.data)
        SetRoomList(res.data)
      }).catch(error=>{
          alert("Error")
      });       
    }
    else{
      axios.get("http://localhost:8000/api/room/",{headers:{'Authorization':"Token "+user.token,'Content-Type':'false'}}).then((res) => {
        SetRoomList(res.data)
      }).catch(error=>{
          history.push("/")
      });   
      
    }
    },[filter])
  //--------------------Add member to room--------------------
  const joinRoom = (roomID)=>{
    console.log(user.ID)
    console.log(roomID)
    let formData = new FormData()
    formData.append('user',user.ID)
    formData.append('room',roomID)
    axios.post("http://localhost:8000/api/member/",formData,{headers:{'Authorization':"Token "+user.token}}).then((res) => {
        console.log(res.data)
      }).catch(error=>{
        console.log(error)
      })
  }
  const leaveRoom = (roomID)=>{
    console.log(user.ID)
    console.log(roomID)
    let formData = new FormData()
    formData.append('user',user.ID)
    formData.append('room',roomID)
    axios.delete("http://localhost:8000/api/member/",{headers:{'Authorization':"Token "+user.token},data:{'user':user.ID,'room':roomID}}).then((res) => {
        console.log(res.data)
        SetRoomList(roomList.filter(room => room.id != roomID))
      }).catch(error=>{
        console.log(error)
      })
  }
  return (
    <div className="Rooms">
      <HomeButton/>
        {showForm? (<div className = "RoomForm">
          <h1>Room Creation</h1>
          <img className="closeFormButton" onClick={()=>{toggleForm(false)}} src="https://img.icons8.com/fluent-systems-filled/48/000000/x.png"/>
          <RoomForm/>
        </div>) :(<div>
        </div>)}
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
              {filter != "Joined"? (
                <div>
                  <div className="roomNameBanner">
                  <h3>{room.room_name}</h3>
                  </div>
                <button onClick={()=>joinRoom(room.id)} className="join-delete-room-button"><img src="https://img.icons8.com/plasticine/32/000000/plus.png"/></button>
                </div>
              ):(<div>
                <div className="roomNameBanner">
                <h3>{room.room_name}</h3>
                </div>
                <button className="go-to-room-button"><NavLink className="room-navlink" to={"/Room/"+room.id}><img src="https://img.icons8.com/fluent/32/000000/enter-2.png"/></NavLink></button>
                <button onClick={()=>leaveRoom(room.id)} className="join-delete-room-button"><img src="https://img.icons8.com/fluent/32/000000/export.png"/></button>
              </div>)}
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