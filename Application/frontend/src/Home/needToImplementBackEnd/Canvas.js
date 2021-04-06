import React, { useEffect,useState, useContext,useRef } from "react";
import { UserContext } from "../../Context/UserContext";
import { LayerContext } from "../../Context/LayerContext";
import { useForm } from "react-hook-form";
import '../../Styling/Canvas.css'
import {w3cwebsocket} from "websocket"
const Canvas = (props) => {
  //User context
  const { context,setContext } = useContext(LayerContext);
  // reference for the websocket
  const ws = useRef(null)
  //Current position of the cursor
  const [pos, setPos] = useState({offX:0,offY:0})
  //Client's prefrence before sending stroke
  var client_color =""
  var client_width =0
  var client_opacity =0
  //Canvas and Canvas's 2d context reference
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  //Check if drawing mode is on
  const [isDrawing,setIsDrawing] = useState(false)
  //Check if eye dropper mode is on
  const [isEyeDropper,setisEyeDropper] = useState(false)
  //Permission to draw
  const [permission,setPermission] = useState(true) 
  //Function for checking if props have been updated in the parent component
  console.log("Layer",props.no,":",permission)
  function useDidUpdate (callback, deps) {
    const hasMount = useRef(false)
    useEffect(() => {
      if (hasMount.current) {
        callback()
      } else {
        hasMount.current = true
      }
    }, deps)
  }
  //Initialize the Canvas when the component is mounted
  useEffect(()=>{
      

      //Get Canvas reference  
      const canvas = canvasRef.current;
      if(canvas){
        //Initlizing canvas
        canvas.width = props.width*2;
        canvas.height = props.height*2;
        canvas.style.width = `${props.width}px`;
        canvas.style.height = `${props.height}px`;
        canvas.style.backgroundColor = `transparent`;
        //if canvas is selected by the parent component then set canvas to be editable
        if(props.selected === props.no){
          canvas.style.pointerEvents = 'auto'
        }
        else{
          canvas.style.pointerEvents = 'none'
        }
        if(props.permission){
          setPermission(true)
        }
        else{
          setPermission(false)
        }
        //getting and setup the 2d rendering context
        //Brush props include:
        //tip
        //color
        //lineWidth
        const my_context = canvas.getContext("2d");
        my_context.scale(2,2)
        my_context.lineCap = props.brush.tip
        my_context.strokeStyle = props.brushColor
        my_context.lineWidth=props.brushSize
        my_context.globalAlpha  = props.brushOpacity
        //Storing the 2d context
        contextRef.current = my_context
        //------------------------------Websocket-----------------------
        //---------------------------Start websocket--------------------
        ws.current = new w3cwebsocket('ws://localhost:8000/Canvas/'+props.roomID+'_'+props.no+'/')
        //----------------------------Open websocket--------------------
        ws.current.onopen = ()=>{
          //Send layer initialize message
          ws.current.send(JSON.stringify({
            type:"init_ask_permission"
          }))
        }
      }
  },[]);

  useEffect(()=>{
    ws.current.onmessage = (message) =>{
        //Convert respsonse from server to json
          const dataFromServer = JSON.parse(message.data);
          if(dataFromServer.type== "stroke"){
            //Set the current brush preference to the sender preference
            contextRef.current.globalCompositeOperation = 'source-over'
            setBrushToSenderPref(dataFromServer)
            //draw the stroke
            draw(dataFromServer)
            //Set back the current brush preference to the client preference based on their current tool
            resetBrushToClient()            
          }
          if(dataFromServer.type== "eraser"){
            //Set the current brush preference to the sender preference
              contextRef.current.globalCompositeOperation = 'destination-out'
              //draw the stroke
              draw(dataFromServer)
             //Set back the current brush preference to the client preference based on their current tool
             resetBrushToClient()
          }


           //-----------------------------------------------------------------------------------------
          //-----------------------------------------------------------------------------------------
          if(dataFromServer.type== "init_ask_permission"){
            //If current channel has permission then allow to receive ask message
            if(permission ==true){
              console.log("Initial Permission for layer")
              //If current channel is the sender then reply as follows:
              if(dataFromServer.sender_channel_name == dataFromServer.receiver_channel_name){
                ws.current.send(JSON.stringify({
                  type:"init_answer_permission",
                  sender_channel_name: dataFromServer.sender_channel_name,
                  permission: false
                }))
              }
              else{
                ws.current.send(JSON.stringify({
                  type:"init_answer_permission",
                  sender_channel_name: dataFromServer.sender_channel_name,
                  permission: true
                }))
              }
            }
            else{
              console.log("You dont have permission to give")
            }
          }
          if(dataFromServer.type== "init_answer_permission"){
            // console.log("Answer for Layer:",props.no,": ",!dataFromServer.permission)
            if(dataFromServer.permission == true){
              //Does not have permission if there exists a respond that has permission              
              setPermission(false)
            }
          }
          //--------------------------------------------------------------------------------------------------------
          //-----------------------------------------------------------------------------------------------------------------
          if(dataFromServer.type== "answer_permission"){
            if(dataFromServer.permission == true){
              //Does not have permission if there exists a respond that has permission              
              setPermission(false)
            }
            else{
              //Does have permission if there exists no respond that has permission
              setPermission(true)
            }
          }
          if(dataFromServer.type== "ask_permission"){
            // console.log("Current Permission for layer",props.no,": ",permission)
            if(permission == true){
              console.log("Asking for permission")
              let give_permission = window.confirm("A user is asking for permission of your current layer")
              if(give_permission){
                setPermission(false)
              }
              else{
                setPermission(true)
              }
              ws.current.send(JSON.stringify({
                type:"answer_permission",
                sender_channel_name: dataFromServer.sender_channel_name,
                permission: !give_permission
              }))
            }
          }
          

        } 
  },[permission])
  //Set brush to sender preference
  const setBrushToSenderPref = (senderData)=>{
    //Save the user preference before changing to sender data
    client_color = contextRef.current.strokeStyle
    client_width = contextRef.current.lineWidth
    client_opacity = contextRef.current.globalAlpha
    //Set brush to sender preference
    contextRef.current.strokeStyle = senderData.color
    contextRef.current.lineWidth = senderData.brushSize
    contextRef.current.globalAlpha = senderData.brushOpacity
  }
  //Reset brush to client preference
  const resetBrushToClient = ()=>{
    //Check what type of tool the client were and is using and set brush to that preference
    //If tool to brush
    if(!props.brushtool.Tools[1].class.includes('active-tool-box')){
      contextRef.current.globalCompositeOperation = 'source-over'
    }
    else{
      //Set tool to eraser
      contextRef.current.globalCompositeOperation = 'destination-out'
    }
    //Set color back to client' s preference
    contextRef.current.strokeStyle = client_color
    contextRef.current.lineWidth = client_width
    contextRef.current.globalAlpha = client_opacity
  }

  //Function for drawing the data received from the server
  const draw =(data)=>{
          contextRef.current.beginPath()
          contextRef.current.moveTo(data.startPos.offX,data.startPos.offY)
          contextRef.current.lineTo(data.stroke.offsetX,data.stroke.offsetY)
          contextRef.current.stroke()
          contextRef.current.closePath()
  }
  //----------------Websocket send response from the server----------
  const addStrokeToGroup= (startPos,stroke)=>{
    if(!props.brushtool.Tools[1].class.includes('active-tool-box')){
      //Send a stroke if the current tool is brush
      ws.current.send(JSON.stringify({
        type:"stroke",
        startPos:startPos,
        stroke: stroke,
        color:props.brushColor,
        brushSize:props.brushSize,
        brushOpacity:props.brushOpacity
      }))
    }
    else{
      //Send an eraser if the current tool is an eraser
      ws.current.send(JSON.stringify({
        type:"eraser",
        startPos:startPos,
        stroke: stroke,
        color:props.brushColor,
        brushSize:props.brushSize,
        brushOpacity:props.brushOpacity
      }))
    }

}
  // --------------------Check if the prop "hidden" is updated, called everytime the prop is updated----------------
  useDidUpdate(()=>{
    //Update context2D every time the brush preference or tools are changed in the parent component
    //Change a stroke texture
    contextRef.current.lineCap = props.brush.tip
    //Change a behaviour for different tool
    //*Tool != eraser
    if(!props.brushtool.Tools[1].class.includes('active-tool-box')){
      contextRef.current.globalCompositeOperation = 'source-over'
      //*Tool = eyedropper
      if(props.brushtool.Tools[2].class.includes('active-tool-box')){
        setisEyeDropper(true)
      }
      else{
        setisEyeDropper(false)
      }
    }
    else{
      //*Tool = eraser
      contextRef.current.globalCompositeOperation = 'destination-out'
    }
    //Change brush color
    contextRef.current.strokeStyle = props.brushColor 
    //Change width of the line
    contextRef.current.lineWidth=props.brushSize
    //Change width of the line
    contextRef.current.globalAlpha=props.brushOpacity
    //Change pen pressure(To be added)
    //TODO:



    
    //Change layer options
    if(props.hidden){
      canvasRef.current.style.display='none'
    }
    else{
      canvasRef.current.style.display='block'
    }
  },[props])
  //Ask permission to draw on the current layer
  const askPermission = ()=>{
    ws.current.send(JSON.stringify({
      type:"ask_permission"
    }))
  }
  //Check what layer the user has just selected and ask permission to access that layer
  useDidUpdate(()=>{
    console.log("Different layer")
    if(props.selected == props.no){
      canvasRef.current.style.pointerEvents = 'auto'
      if(!permission){
        askPermission()
      }
    }
    else{
      canvasRef.current.style.pointerEvents = 'none'
    }
  }, [props.selected,permission])
  //--------------------Eyedropper function----------------------------
  const eyeDropColor =(corrdinate)=>{
    let pxData = contextRef.current.getImageData(corrdinate.offsetX*2,corrdinate.offsetY*2,1,1);
    let eyeDroppedColor = "rgb("+pxData.data[0]+","+pxData.data[1]+","+pxData.data[2]+")"
    props.setColor(eyeDroppedColor)
  }
  // --------------------on mouse down start drawing-------------------
  const startDrawing =({nativeEvent})=>{
      //Take current corrdinate of mouse
      const {offsetX,offsetY} = nativeEvent
      const corrdinate = {offsetX:offsetX, offsetY:offsetY}
      //Only draw when eye dropper mode is off 
      if(permission){
        if(!isEyeDropper){
          contextRef.current.beginPath()
          contextRef.current.moveTo(offsetX,offsetY)
        }
        //update currrent pos of mouse
        setPos({...pos, offX:offsetX,offY:offsetY})
        setIsDrawing(true)

      }
      if(isEyeDropper){
        eyeDropColor(corrdinate)
      }

  }
  //------------------------on mouse up stop taking input-------------------
  const finishDrawing = ({nativeEvent})=>{
    if(permission){
      //Take current corrdinate of mouse
    const {offsetX,offsetY}= nativeEvent
    const corrdinate = {offsetX:offsetX, offsetY:offsetY}
    if(permission){
      //update currrent pos of mouse
      setPos({...pos, offX:offsetX,offY:offsetY})
      if(!isEyeDropper){
        contextRef.current.closePath()
      }
    }
    //Set drawing mode to false when lift mouse
    setIsDrawing(false)
    }
  }
  // ----------------------while mouse down and moving , start rendering the stroke---------------
  const drawEvent = ({nativeEvent})=>{
        //if not drawing, stoping excuting the rest of the function
        if(!isDrawing || !permission){
          return 
        }
        //Take current corrdinate of mouse
        const {offsetX,offsetY}= nativeEvent
        const corrdinate = {offsetX:offsetX, offsetY:offsetY}
        if(!isEyeDropper){
          //draw the stroke using x and y corrdinate taken above
          contextRef.current.lineTo(offsetX,offsetY)
          contextRef.current.stroke()
          //update currrent pos of mouse
          setPos({...pos, offX:offsetX,offY:offsetY})
          addStrokeToGroup(pos,corrdinate)
        }
  }

  return (<canvas id={props.no} className='Canvas'
        onPointerDown={startDrawing}
        onPointerUp={finishDrawing}
        onPointerMove={drawEvent}
        ref={canvasRef}
        style={{position: 'absolute',zIndex:props.no,backgroundColor:"transparent"}}
        />
  );
};

export default Canvas;
