import React, { useEffect,useState, useContext,useRef } from "react";
import { UserContext } from "../../Context/UserContext";
import { LayerContext } from "../../Context/LayerContext";
import { useForm } from "react-hook-form";
import '../../Styling/Canvas.css'
import {w3cwebsocket} from "websocket"
const Canvas = (props) => {
  //User context
  const { context,setContext } = useContext(LayerContext);
  // reference for the canvas
  const ws = useRef(null)
  //Current position of the cursor
  const [pos, setPos] = useState({offX:0,offY:0})
  
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
  
  //Context reference
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const other_contextRef = useRef(null)
  const [isDrawing,setIsDrawing] = useState(false)
  useEffect(()=>{
      const canvas = canvasRef.current;
      if(canvas){
        canvas.width = props.width*2;
        canvas.height = props.height*2;
        canvas.style.width = `${props.width}px`;
        canvas.style.height = `${props.height}px`;
        canvas.style.backgroundColor = `transparent`;
        if(props.selected === props.no){
          canvas.style.pointerEvents = 'auto'
        }
        else{
          canvas.style.pointerEvents = 'none'
        }
        //getting and setup the 2d rendering context
        //Brush props include:
        //tip
        //color
        //lineWidth
        const my_context = canvas.getContext("2d");
        my_context.scale(2,2)
        my_context.lineCap = props.brush.tip
        my_context.strokeStyle = props.brush.color
        my_context.lineWidth=props.brush.lineWidth
        //storing the 2d context
        contextRef.current = my_context

        //------------------------------Websocket----------------------------------
        //---------------------------------Start websocket--------------------
        ws.current = new w3cwebsocket('ws://localhost:8000/Canvas/'+props.roomID+'_'+props.no+'/')
        //----------------Websocket is open----------------
        ws.current.onopen = ()=>{
        console.log('Websocket client Connected')}
      }
  },[]);
  useEffect(()=>{
    ws.current.onmessage = (message) =>{
        //Convert respsonse from server 
          const dataFromServer = JSON.parse(message.data);
          draw(dataFromServer)
        } 
  },[])
  const draw =(data)=>{
          //Change the brush back to the message preference

          //draw the line
          contextRef.current.beginPath()
          contextRef.current.moveTo(data.startPos.offX,data.startPos.offY)
          contextRef.current.lineTo(data.stroke.offsetX,data.stroke.offsetY)
          contextRef.current.stroke()
          contextRef.current.closePath()
          //Change the brush back to the client preference
          // contextRef.current.lineCap = props.brush.tip
          // contextRef.current.strokeStyle = props.brush.color
          // contextRef.current.lineWidth=props.brush.lineWidth
    
  }

  const addStrokeToGroup= (startPos,stroke)=>{
    //----------------Websocket send response from the server----------
    ws.current.send(JSON.stringify({
      type:"stroke",
      startPos:startPos,
      stroke: stroke,
      no:2
    }))

}
  // --------------------Check if the prop "hidden" is updated, called everytime the prop is updated----------------
  useDidUpdate(()=>{
    contextRef.current.lineCap = props.brush.tip
    contextRef.current.strokeStyle = props.brushColor
    contextRef.current.lineWidth=props.brush.lineWidth
    if(props.hidden){
      canvasRef.current.style.display='none'
    }
    else{
      canvasRef.current.style.display='block'
    }
    if(props.selected == props.no){
      canvasRef.current.style.pointerEvents = 'auto'
    }
    else{
      canvasRef.current.style.pointerEvents = 'none'
    }
  },[props])
  //Stroke data to send test
  const checkLine = (data)=>{
    console.log("Line:",data)
  }
  // --------------------on mouse down start drawing-------------------
  const startDrawing =({nativeEvent})=>{
      const {offsetX,offsetY} = nativeEvent
      contextRef.current.beginPath()
      contextRef.current.moveTo(offsetX,offsetY)
      //update currrent pos of mouse
      setPos({...pos, offX:offsetX,offY:offsetY})
      setIsDrawing(true)

  }
  //------------------------on mouse up stop taking input-------------------
  const finishDrawing = ({nativeEvent})=>{
    const {offsetX,offsetY} = nativeEvent
    //update currrent pos of mouse
    setPos({...pos, offX:offsetX,offY:offsetY})
    contextRef.current.closePath()
    // addStrokeToGroup([20,20],line)
    setIsDrawing(false)
  }
  // ----------------------while mouse down and moving , start rendering the stroke---------------
  const drawEvent = ({nativeEvent})=>{
      //if not drawing, stoping excuting the rest of the function
      if(!isDrawing){
        return 
      }
      //Take x and y position of the pointer
      const {offsetX,offsetY}= nativeEvent
      const corrdinate = {offsetX:offsetX, offsetY:offsetY}
      //draw the stroke using x and y corrdinate taken above
      contextRef.current.lineTo(offsetX,offsetY)
      contextRef.current.stroke()
      //update currrent pos of mouse
      setPos({...pos, offX:offsetX,offY:offsetY})
      addStrokeToGroup(pos,corrdinate)
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
