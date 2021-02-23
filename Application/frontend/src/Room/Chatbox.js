import React, { useEffect, useRef } from "react";
import "../Styling/ChatBox.css";
import {useHistory } from "react-router";
// ----------------Context------------------
import { UserContext } from "../Context/UserContext";
import {useState,useContext} from "react";
import {w3cwebsocket} from "websocket"
//--------------------------Pages------------------------
import DrawingMode from "../Home/needToImplementBackEnd/DrawingMode";
//-------------------------Routing-----------------------------
import { Link, NavLink,Route, Switch,useParams } from "react-router-dom";
const ChatBox = (props) => {
  //User context
  const { user, setUser } = useContext(UserContext);
  const {profile} = user;
  const {username} = user;
  //--------------------------------------------------------------------------------
  const [message,setMessage] = useState("");
  const [messageList,setMessageList] = useState([{"user":'dataFromServer.user',"message":'dataFromServer.message'}])
  const ws = useRef(null)
  useEffect(()=>{
        console.log(props.roomName)
        //---------------------------------Start websocket--------------------
        ws.current = new w3cwebsocket('ws://localhost:8000/Room/'+props.roomID+'/')
        //----------------Websocket is open----------------
        ws.current.onopen = ()=>{
        console.log('Websocket client Connected')}
                   
  },[])

  useEffect(()=>{
    ws.current.onmessage = (message) =>{
        //Convert respsonse from server 
          console.log(message.data);
          const dataFromServer = JSON.parse(message.data);
          //Reset message input box
          setMessage('')
          //Add message to text box
          console.log(messageList);
          setMessageList([...messageList,{"user":dataFromServer.user,"message":dataFromServer.message}])} 
  },[messageList])
    //-------------------------Send message to channel group--------------
    const addMessageToGroup= ()=>{
        //----------------Websocket send response from the server----------
        ws.current.send(JSON.stringify({
          type:"chat_message",
          msg: message,
          username:username
        }))

    }
  //-------------------------Handle drawing and messaging-----------------------------
  return (
      <div id="ChatBox">
          {/* ------------------Render Message------------------------ */}
        <div id="chat-log"> 
        {  
            messageList.map((_message,key)=>{
            return (<div id={"message_"+key} className="message"><p>{_message.user+": "+_message.message}</p></div>);
            })
        }
        </div>
        {/* ---------------------------Message input box--------------- */}
        <input value={message} onChange={(e)=>{setMessage(e.target.value)}} placeholder="Send a message" id="chat-message-input" type="text" style={{backgroundColor:"grey"}}/>
        {
           (message=='')?(<button onClick={addMessageToGroup} disabled>Send</button>) : (<button onClick={addMessageToGroup}>Send</button>)
        }
      </div>

  );
};

export default ChatBox;