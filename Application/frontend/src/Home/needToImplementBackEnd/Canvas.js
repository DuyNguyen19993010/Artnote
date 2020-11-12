import React, { useEffect,useState, useContext,useRef } from "react";
import { UserContext } from "../../Context/UserContext";
import { LayerContext } from "../../Context/LayerContext";
import { useForm } from "react-hook-form";
import '../../Styling/Canvas.css'

const Canvas = (props) => {
  //User context
  const { context,setContext } = useContext(LayerContext);
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
        const my_context = canvas.getContext("2d");
        my_context.scale(2,2)
        my_context.lineCap = props.brush.tip
        my_context.strokeStyle = props.brush.color
        my_context.lineWidth=props.brush.lineWidth
        //storing the 2d context
        contextRef.current = my_context
        // setContext(context.push({layerNo:props.no,context:contextRef}))  
        // console.log(context) 
      }
  },[]);
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
  const startDrawing =({nativeEvent})=>{
      const {offsetX,offsetY} = nativeEvent
      contextRef.current.beginPath()
      contextRef.current.moveTo(offsetX,offsetY)
      setIsDrawing(true)

  }
  const finishDrawing = ()=>{
    contextRef.current.closePath()
    console.log("End of canvas " + props.no)
    setIsDrawing(false)
  }
  const draw = ({nativeEvent})=>{
      if(!isDrawing){
        return 
      }
      console.log('drawing')
      const {offsetX,offsetY}= nativeEvent
      contextRef.current.lineTo(offsetX,offsetY)
      contextRef.current.stroke()
  }
  return (<canvas id={props.no} className='Canvas'
        onPointerDown={startDrawing}
        onPointerUp={finishDrawing}
        onPointerMove={draw}
        ref={canvasRef}
        style={{position: 'absolute',zIndex:props.no,backgroundColor:"transparent"}}
        />
  );
};

export default Canvas;
