import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
//-------------------------------Context and hooks----------------------
import { useState, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { useForm } from "react-hook-form";
//-----------------------css import ------------------------------------
import 'bootstrap/dist/css/bootstrap.min.css'
import "../../Styling/RoomList.css";


const RoomList = (props) => {
  //User context
  const { user, setUser } = useContext(UserContext);
  const { Valid } = user;
  const [roomList,SetRoomList]= useState([]);
  let {filter} = useParams()
  //-----------------------react form----------------
  const { register, handleSubmit, errors } = useForm();
  //Submit form
  const requestRoom = (data) => {
    console.log(data);
  };
  //-----------------------Set data for roomlist-----------------------
  useEffect(()=>{
    console.log(filter)
    if(filter == "Joined"){
      SetRoomList([{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"},{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"},{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"},{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"},{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"},{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"},{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"},{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"},{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"},{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"},{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"},{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"},{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"},{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"},{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"},{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"},{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"},{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"},{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"},{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"},{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"},{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"},{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"},{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"},{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"},{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"},{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"},{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"},{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"},{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"},{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"},{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"},{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"},{"roomName":"Room 1","src":"https://i.pinimg.com/originals/0d/1a/84/0d1a84487eac50ad8ac4df921ce3c4c5.jpg"}])
    }
    else{
      SetRoomList([{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"},{"roomName":"Room 1","src":"https://cdnb.artstation.com/p/assets/images/images/029/989/951/large/rossdraws-baby-faye-post.jpg?1599244529"}])
  
    }
    },[filter])
  


  return (
    <div className="Rooms">
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
        {/* ------------------------------Fitler---------------------------- */}
      <nav className="filter">
        <NavLink  className='navlink' activeClassName='active_nav' to="/RoomList/Public" exact={true}>Public</NavLink>
        <NavLink  className='navlink' activeClassName='active_nav' to="/RoomList/Joined" exact={true}>Joined</NavLink>
      </nav>


      {/* ------------------------Render room----------------------- */}
      <div className="card-deck">
        {
          roomList.map((room,key)=>{
            return (<div className="room card" id={"room_"+key}>
              <div className="roomNameBanner">
              <h3>{room.roomName}</h3>
              </div>
              <img className="card-img-top" src={room.src}/>
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