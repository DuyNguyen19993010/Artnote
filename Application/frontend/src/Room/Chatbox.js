import React, { useEffect, useRef,useCallback } from "react";
import "../Styling/ChatBox.css";
// ----------------Context------------------
import { UserContext } from "../Context/UserContext";
import {useState,useContext} from "react";
import {w3cwebsocket} from "websocket"
const ChatBox = (props) => {
  //User context
  const { user, setUser } = useContext(UserContext);
  const {username} = user;
  //end of message ref
  const messageEndRef = useRef(null)
  //Message list
  const [message,setMessage] = useState("");
  const [messageList,setMessageList] = useState({messages:[]})
  const ws = useRef(null)
  useEffect(()=>{
        console.log(props.roomName)
        //---------------------------------Start websocket--------------------
        ws.current = new w3cwebsocket('ws://localhost:8000/Room/'+props.roomID+'/')
        //----------------Websocket is open----------------
        ws.current.onopen = ()=>{
        console.log('Websocket client Connected')}
                   
  },[])
  const scrollToBottom = () => {
    if(messageEndRef.current){
      messageEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }
  useEffect(() => {
    scrollToBottom()
  }, [messageList]);

  useEffect(()=>{
    ws.current.onmessage = (message) =>{
        //Convert respsonse from server 
          console.log(message.data);
          const dataFromServer = JSON.parse(message.data);
          //Reset message input box
          setMessage('')
          //Add message to text box
          console.log(messageList.messages);
          addMessage(dataFromServer)
  } 
  },[messageList])
  useEffect(()=>{
    window.addEventListener("keydown",submitMessage)
    return ()=>{
      window.removeEventListener("keydown",submitMessage)
    }
  },[message])
    const addMessage = (message)=>{
      let temp_arr = messageList.messages
      temp_arr.push({user:message.user,profile_pic:message.profile_pic,message:message.message})
      setMessageList({...messageList,messages:temp_arr})
    }
    //-------------------------Send message to channel group--------------
    const submitMessage= useCallback(e=>{
      const{key,keyCode}=e;
      if(keyCode ==13 && message!=""){
        addMessageToGroup()
      }
    })
    const addMessageToGroup= ()=>{
        //----------------Websocket send response from the server----------
        ws.current.send(JSON.stringify({
          type:"chat_message",
          msg: message,
          username:username,
          profile_pic: user.profile.profile_pic
        }))
    }
  //-------------------------Handle drawing and messaging-----------------------------
  return (
      <div id="ChatBox">
          {/* ------------------Render Message------------------------ */}
        <div id="chat-log"> 
        {messageList.messages.length!=0? (<div/>):(<div className="no-message-wrapper"><h1>There is no message<img src="https://img.icons8.com/carbon-copy/40/000000/no-chat-message.png"/>.</h1></div>)}
        {  
            messageList.messages.map((_message,key)=>{
            return (username==_message.user?(
              <div key={key} className="message-wrapper">

                <div className="user-wrapper">
                  <div className="profile_pic">
                    <img src={"http://localhost:8000"+_message.profile_pic}/>
                  </div>
                  <h3 className="username">{_message.user}</h3>
                </div>
                
                {username==_message.user?(<div className="text-area-own-message">
                  <p>{_message.message}</p>
                </div>):(<div className="text-area">
                  <p>{_message.message}</p>
                </div>)}
              </div>
            ):(
              <div key={key} className="message-wrapper message-wrapper-own-message">
                
                {username==_message.user?(<div className="text-area-own-message">
                  <p>{_message.message}</p>
                </div>):(<div className="text-area">
                  <p>{_message.message}</p>
                </div>)}
                <div className="user-wrapper">
                  <div className="profile_pic">
                    <img src={"http://localhost:8000"+_message.profile_pic}/>
                  </div>
                  <h3 className="username">{_message.user}</h3>
                </div>
              </div>
            ));
            })
        }
        <div ref={messageEndRef}/>
        </div>
        {/* ---------------------------Message input box--------------- */}
        <input value={message} onChange={(e)=>{setMessage(e.target.value)}} placeholder="Send a message" id="chat-message-input" type="text"/>
        {
           (message=='')?(<button onClick={addMessageToGroup} disabled>Send</button>) : (<button onClick={addMessageToGroup}>Send</button>)
        }
      </div>

  );
};

export default ChatBox;