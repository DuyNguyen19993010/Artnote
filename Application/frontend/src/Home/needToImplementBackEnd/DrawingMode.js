import React, { useEffect,useState, useContext,useRef } from "react";
import { UserContext } from "../../Context/UserContext";
import { LayerContext } from "../../Context/LayerContext";
import "../../Styling/DM.css";
import Canvas from './Canvas';
import {SketchPicker} from 'react-color'

const DM = (props) => {
  //User context
  const { user, setUser } = useContext(UserContext);
  const [brush,setBrush] = useState({lineWidth:4,tip:'round'});
  const [color,setColor]=useState('#bbb');
  const [canvases,setCanvas]=useState({Layers:[{no:0,hidden:false},{no:1,hidden:false},{no:2,hidden:false}]})
  const [selectedLayer,SelectLayer]=useState(0)
  
  const renderLayers = ()=>{
    return canvases.Layers.map((layer,index)=>{
      return <Canvas roomID={props.roomID} selected={selectedLayer} hidden = {layer.hidden} no={layer.no} draggable='true' width={1000} height={800} brush={brush} brushColor={color}/>
    })
  }
  //------------------------------------------------------------------------------
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
    return (<><input type='radio' checked={selectedLayer == layer.no} value={layer.no} onChange={(e)=>{SelectLayer(e.target.value)}}/>Layer {layer.no}:<button onClick={()=>toggleLayer(layer.no)}>{layer.hidden?(<h1>Show</h1>):(<h1>Hide</h1>)}</button><br/></>)
    })
  }
  return (
  <div className="DM" onClick={()=>{console.log('home clicked')}}>

    {/* //---------------------------------------------------------------------Used for rendering canvas------------------------------------------------------ */}
    <SketchPicker width='300px' className='colorPicker' color={color} onChange={updatedColor=>setColor(updatedColor.hex)} onChangeComplete={updatedColor=>setColor(updatedColor.hex)}/>
    <div className="Canvases" >
        
        {renderLayers()}
        
    </div>
    <div className="Layers">
      <h1>Selected layer is:{selectedLayer}</h1>
      {layerSystem()}
    </div>
  </div>
        

  );
};

export default DM;
