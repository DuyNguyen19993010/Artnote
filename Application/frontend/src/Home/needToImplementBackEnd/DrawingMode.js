import React, { useEffect,useState, useContext,useRef } from "react";
import { UserContext } from "../../Context/UserContext";
import { LayerContext } from "../../Context/LayerContext";
import Canvas from './Canvas';
import {SketchPicker} from 'react-color'
// -----------------CSS-------------------
import "../../Styling/DM.css";
import { Layer } from "react-konva";
const DM = (props) => {
  //User context
  const { user, setUser } = useContext(UserContext);
  const [brush,setBrush] = useState({lineWidth:4,tip:'round'});
  const [color,setColor]=useState('#bbb');
  const [canvases,setCanvas]=useState({Layers:[{no:0,hidden:false},{no:1,hidden:false},{no:2,hidden:false},{no:3,hidden:false}]})
  const [selectedLayer,SelectLayer]=useState(0)
  //Brush tools list
  const[brushTools,toggleBrushTool] = useState({Tools:[{name:"brush",class:"tool-box active-tool-box",icon:"https://img.icons8.com/metro/32/000000/paint.png"},{name:"eraser",class:"tool-box",icon:"https://img.icons8.com/ios-filled/32/000000/eraser.png"},{name:"airbrush",class:"tool-box",icon:"https://img.icons8.com/ios-glyphs/32/000000/paint-sprayer.png"}]})

  
  //Tools reference
  const colorPickerRef = useRef(null)
  const layerRef = useRef(null)
  //Tool initialization
  const [colorPickerVisible, toggleColorPicker] = useState(true)
  const [layerSystemVisible, toggleLayerSysten] = useState(true)
  //Tool circle initialization
  const colorPickerCicleRef = useRef(null)
  const layerCircleRef = useRef(null)
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
        return (<div className={tool.class} id="brush-tool"><img onClick={()=>selectBrushTool(index)}  className="tool-icon" src={tool.icon}/></div>)
      }
      if(tool.name == "eraser"){
        return (<div  className={tool.class} id="eraser-tool"><img onClick={()=>selectBrushTool(index)} className="tool-icon" src={tool.icon}/></div>)
      }
      if(tool.name == "airbrush"){
        return (<div  className={tool.class} id="airbrush-tool"><img onClick={()=>selectBrushTool(index)} className="tool-icon" src={tool.icon}/></div>)
      }
      
    })
  }
  const selectBrushTool = (toolIndex)=>{
    console.log("clicked")
    let brushToolCopy = {...brushTools}
    for(let i= 0; i< brushToolCopy.Tools.length; i++){
      if(i == toolIndex){
        brushToolCopy.Tools[i].class+=" active-tool-box"
      }
      else{
        console.log("unactive tool")
        brushToolCopy.Tools[i].class = "tool-box"
      }
    }
    console.log(brushToolCopy.Tools)
    toggleBrushTool(brushToolCopy)

  }
  //-------------------------------Layer System-----------------------
  const renderLayers = ()=>{
    return canvases.Layers.map((layer,index)=>{
      return <Canvas roomID={props.roomID} selected={selectedLayer} hidden = {layer.hidden} no={layer.no} draggable='true' width={1200} height={700} brush={brush} brushColor={color}/>
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
  return (
  <div className="DM">
    <div className = "optionBar"> 

    </div>
    <div className = "toolBar"> 
    {renderTools()}
    </div>
    {/* //-----------Used for rendering canvas--------- */}
    <div className="Canvases" >
        {renderLayers()}
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
      <div className="layer-sytem-footer"><button>+ New layer</button></div>
    </div>
  </div>
        

  );
};

export default DM;
