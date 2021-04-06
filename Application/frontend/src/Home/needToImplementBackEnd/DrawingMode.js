import React, { useEffect,useState, useContext,useRef } from "react";
import { UserContext } from "../../Context/UserContext";
import { LayerContext } from "../../Context/LayerContext";
import Canvas from './Canvas';
import {SketchPicker} from 'react-color'
//-----------------Websocket--------------
import {w3cwebsocket} from "websocket"
// -----------------CSS-------------------
import "../../Styling/DM.css";
import { Layer } from "react-konva";
const DM = (props) => {
  //User context
  const { user, setUser } = useContext(UserContext);
  const [color,setColor]=useState('#bbb');
  const [canvases,setCanvas]=useState({Layers:[{no:0,hidden:false,permission:true},{no:1,hidden:false,permission:true},{no:2,hidden:false,permission:true},{no:3,hidden:false,permission:true}]})
  const [selectedLayer,SelectLayer]=useState(0)
  //Permission dialog
  const [permission_dialog_visible, setPermissionDialogVisibility] = useState(true)
  //Permission answer state
  const[permission_answer, setPermissionAnswer] = useState(false)
  //Brush tools list
  const[brushTools,toggleBrushTool] = useState({Tools:[{name:"brush",class:"tool-box active-tool-box",icon:"https://img.icons8.com/metro/32/000000/paint.png"},{name:"eraser",class:"tool-box",icon:"https://img.icons8.com/ios-filled/32/000000/eraser.png"},{name:"eye_droper",class:"tool-box",icon:"https://img.icons8.com/ios-glyphs/32/000000/paint-sprayer.png"}]})
  //Brush setting menu reference
  const[settingOpen, toggleSetting]=useState(false)
  //Pen pressure toggle
  const[pressureOn , togglePressure] = useState(false)
  //Pen size
  const[penSize,ChangePenSize] = useState(50)
  //Pen density
  const[penDensity,ChangePenDensity] = useState(50)
  //Pen opacity
  const[penOpacity,ChangePenOpacity] = useState(0.5)
  //Pen hardness
  const[penHardness,ChangePenHardness] = useState(50)
  //Setting up brush
  const [brush,setBrush] = useState({lineWidth:penSize,tip:'round'});
  //Tools reference
  const colorPickerRef = useRef(null)
  const layerRef = useRef(null)
  //Tool initialization
  const [colorPickerVisible, toggleColorPicker] = useState(true)
  const [layerSystemVisible, toggleLayerSysten] = useState(true)
  //Tool circle initialization
  const colorPickerCicleRef = useRef(null)
  const layerCircleRef = useRef(null)
  // reference for the websocket
  const ws = useRef(null)
  useEffect(()=>{
        //------------------------------Websocket-----------------------
        //---------------------------Start websocket--------------------
        ws.current = new w3cwebsocket('ws://localhost:8000/DrawingRoom/'+props.roomID+'/')
        //----------------------------Open websocket--------------------
        ws.current.onopen = ()=>{
          //Send layer initialize message
          console.log("web socket opened")

        }
  },[])
  useEffect(()=>{
    ws.current.onmessage = (message) =>{
        //Convert respsonse from server to json
        const dataFromServer = JSON.parse(message.data);
        //Add layer message
        if(dataFromServer.type =="add_canvas_layer"){
          group_add_layer()
        }
        //Delete layer message
    } 
  },[canvases])
  const group_add_layer = ()=>{
    //Add layer
    let layer_list =[...canvases.Layers]
    layer_list.push({no:layer_list.length,hidden:false,permission:false})
    setCanvas({...canvases,Layers:layer_list})
  }
  useEffect(()=>{
    if(!colorPickerVisible){
      colorPickerRef.current.style.display = "none"
      colorPickerCicleRef.current.style.backgroundColor = "white"
    }
    else{
      colorPickerRef.current.style.display = "block"
      colorPickerCicleRef.current.style.backgroundColor = "#0773FF"
    }


    if(!layerSystemVisible){
      layerRef.current.style.display = "none"
      layerCircleRef.current.style.backgroundColor = "white"
    }
    else{
      layerRef.current.style.display = "block"
      layerCircleRef.current.style.backgroundColor = "#0773FF"
    }
  },[colorPickerVisible,layerSystemVisible])
  //------------------------------Brush tool system----------------------
  const renderTools = ()=>{
    return brushTools.Tools.map((tool,index)=>{
      if(tool.name == "brush"){
        return (<div className={tool.class} id="brush-tool"><div className="toggle_setting_container"><img onClick={()=>{toggleSetting(!settingOpen)}} src="https://img.icons8.com/fluent-systems-filled/10/000000/dots-loading.png"/></div><img onClick={()=>selectBrushTool(index)}  className="tool-icon" src={tool.icon}/></div>)
      }
      if(tool.name == "eraser"){
        return (<div  className={tool.class} id="eraser-tool"><div className="toggle_setting_container"><img onClick={()=>{toggleSetting(!settingOpen)}} src="https://img.icons8.com/fluent-systems-filled/10/000000/dots-loading.png"/></div><img onClick={()=>selectBrushTool(index)} className="tool-icon" src={tool.icon}/></div>)
      }
      if(tool.name == "eye_droper"){
        return (<div  className={tool.class} id="eye-droper-tool"><img onClick={()=>selectBrushTool(index)} className="tool-icon" src={tool.icon}/></div>)
      }
      
    })
  }
  const selectBrushTool = (toolIndex)=>{
    let brushToolCopy = {...brushTools}
    for(let i= 0; i< brushToolCopy.Tools.length; i++){
      if(i == toolIndex){
        brushToolCopy.Tools[i].class+=" active-tool-box"
      }
      else{
        brushToolCopy.Tools[i].class = "tool-box"
      }
    }
    toggleBrushTool(brushToolCopy)

  }
  //-------------------------------Layer System-----------------------
  const renderLayers = ()=>{
    return canvases.Layers.map((layer,index)=>{
      return <Canvas permission={layer.permission} setColor ={setColor} brushtool={brushTools} roomID={props.roomID} selected={selectedLayer} hidden = {layer.hidden} no={layer.no} draggable='true' width={1200} height={700} brush={brush} brushOpacity={penOpacity} brushSize={penSize} brushColor={color}/>
    })
  }
  const toggleTool = (e)=>{
    if(e.target.id =="color-picker-tool-circle"){
      toggleColorPicker(!colorPickerVisible)
    }
    else{
      toggleLayerSysten(!layerSystemVisible)
    }

  }
  //------------------------layer functions--------------------------------
  // ------------------Choose which layer to draw on-------------------------
  const toggleLayer = (layerNo)=>{
    let toggledLayer =[...canvases.Layers]
    if(toggledLayer[layerNo].hidden){
      toggledLayer[layerNo].hidden= false
    }
    else{
      toggledLayer[layerNo].hidden=true
    }
    setCanvas({...canvases,Layers:toggledLayer})
  }
  // --------------------Handling layer selection-----------------------
  const layerSystem = ()=>{
    return canvases.Layers.map((layer,index)=>{
    return (<div style={layer.no== selectedLayer?({backgroundColor:"#0773FF"}):({backgroundColor:"white"})} className="each-layer" id={layer.no+"-layer-system-layer"}>
    <div className=" toggle-visible-layer-button">
    {!layer.hidden? (<img src="https://img.icons8.com/material-sharp/24/000000/eye-checked.png" className="toggle-layer-button" onClick={()=>toggleLayer(layer.no)}/>):(<img src="https://img.icons8.com/material-rounded/24/000000/eye-unchecked.png" className="toggle-layer-button" onClick={()=>toggleLayer(layer.no)}/>)}
    </div>
    <div className="preview-frame" onClick={(e)=>{SelectLayer(e.target.id.split("-")[0])}}>
      <img src="https://cdnb.artstation.com/p/assets/images/images/020/820/353/20190923223631/smaller_square/ruan-jia-miaow-3.jpg?1569296191"/>
    </div>
    <div onClick={(e)=>{SelectLayer(e.target.id.split("-")[0])}} id={layer.no+"-layer-panel"} className="select-layer-panel"></div>
    </div>)
    })
  }
  //--------------------Add new layer----------------------
  const addNewLayer =()=>{
    console.log("New layer added ")
    let layer_list =[...canvases.Layers]
    layer_list.push({no:layer_list.length,hidden:false,permission:true})
    setCanvas({...canvases,Layers:layer_list})
    ws.current.send(JSON.stringify({
      type:"add_canvas_layer"
    }))
  }
  return (
  <div className="DM">
    <div className = "optionBar"> 

    </div>
    <div className = "toolBar"> 
    {renderTools()}
    </div>
    {/* //-----------Used for rendering canvas--------- */}
    <div className="Canvases" >
        {
        canvases.Layers.map((layer,index)=>{
          return <Canvas permission={layer.permission} setColor ={setColor} brushtool={brushTools} roomID={props.roomID} selected={selectedLayer} hidden = {layer.hidden} no={layer.no} draggable='true' width={1200} height={700} brush={brush} brushOpacity={penOpacity} brushSize={penSize} brushColor={color}/>
        })
        }
    </div>
    {/* ----------------All tools------------------ */}
    {/* -----------------Tools circles------------- */}
    <div className ="tool-circle-wrapper">
      <div ref={colorPickerCicleRef} className = "circles">
        <img onClick={e =>toggleTool(e)} className="circle" id="color-picker-tool-circle" src="https://img.icons8.com/ios-glyphs/40/000000/paint-palette--v1.png" alt="img not available"/> 
      </div>  
      <div ref={layerCircleRef} className = "circles">
        <img onClick={e =>toggleTool(e)}  className="circle" id="layer-tool-circle" src="https://img.icons8.com/fluent-systems-filled/40/000000/stack-of-paper.png" alt="img not available"/> 
      </div>  
    </div>    
    {
      settingOpen? (<div className="brush_setting">
      <div className="header"><h3>Setting</h3></div>
      <ul>
        <li><label className="brush_setting_header">Size</label><input type="range" min="1" max="100" value={penSize} onChange={(e)=>{ChangePenSize(e.target.value)}} className="brush_setting_slider"/></li> 
        <li><label className="brush_setting_header">Density</label><input type="range" min="1" max="100" value={penDensity} onChange={(e)=>{ChangePenDensity(e.target.value)}} className="brush_setting_slider"/></li> 
        <li><label className="brush_setting_header">Opacity</label><input type="range" min="0" max="1" step="0.1" value={penOpacity} onChange={(e)=>{ChangePenOpacity(e.target.value)}} className="brush_setting_slider"/></li> 
        <li><label className="brush_setting_header">Hardness</label><input type="range" min="1" max="100" value={penHardness} onChange={(e)=>{ChangePenHardness(e.target.value)}} className="brush_setting_slider"/></li> 
        <li><label className="brush_setting_header">Pressure:</label><input type="checkbox" checked={pressureOn} onChange={()=>{togglePressure(!pressureOn)}} className="brush_setting_checkbox"/></li> 
      </ul>
    </div>):(<div></div>)
    }
    {/* -----------------Color picker tool---------------- */}
    <div ref={colorPickerRef} className="color-picker">
      <SketchPicker width='300px' className='colorPicker' color={color} onChange={updatedColor=>setColor(updatedColor.hex)} onChangeComplete={updatedColor=>setColor(updatedColor.hex)}/>      
    </div>  
    {/* -----------------Layer tool---------------- */}
    <div ref={layerRef} className="Layers">
      <div className="layer-sytem-banner"><h4>Layers</h4></div>
      <div className="layer-sytem-body">
          {layerSystem()}
      </div>
      <div className="layer-sytem-footer"><button onClick={()=>{addNewLayer()}}>+ New layer</button></div>
    </div>
  </div>
        

  );
};

export default DM;
