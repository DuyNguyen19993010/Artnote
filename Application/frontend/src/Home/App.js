import React from "react";
import { useState,useRef } from "react";
import Home from "./needToImplementBackEnd/Home";
import UserHome from "./needToImplementBackEnd/UserHomePage";
import { NavLink,Route, Switch } from "react-router-dom";
//-----------------------------User context
import { UserContext } from "../Context/UserContext";
import { LayerContext } from "../Context/LayerContext";
//-----------------------------Pages
import PostPage from "./PostPage";
import Upload from "./needToImplementBackEnd/Upload";
import RoomList from "./needToImplementBackEnd/RoomList"
//-----------------------------Room---------------------
import Room from "../Room/Room";
//------------------------------Alert
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
//--------------------------------Css
import "../Styling/App.css";
//--------------------------------------------------------------------------
const App = () => {
  const [user, setUser] = useState({
    ID: "",
    email: "",
    Valid: false,
  });
  const [context,setContext] = useState([])
  const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: "30px",
    // you can also just use 'scale'
    transition: transitions.SCALE,
  };
  return (
    <div className="App">
      {" "}
      <AlertProvider template={AlertTemplate}>
        <UserContext.Provider value={{ user, setUser }} {...options}>
        <LayerContext.Provider value={{context,setContext}}>
          
          <Switch>
            {/*---------------------------------User homepage--------------------*/}
            {/* <Route path="/UserHomePage/"> */}
            <Route path="/UserHomePage/:userName/:Tab">
              <UserHome />
            </Route>
            {/*----------------------------------Drawing mode---------------------------------*/}
            
            <Route path="/RoomList/:filter">
              <RoomList/>
            </Route>

            {/*----------------------------------Room---------------------------------*/}
            
            <Route path="/Room/:roomName">
              <Room/>
            </Route>
            
            {/*---------------------------------Post page--------------------------*/}
            <Route path="/post/:id">
              <PostPage />
              <NavLink to="/">Go back home</NavLink>
            </Route>
            {/* ----------------------------Upload-------------------------------- */}
            <Route path="/Upload">
              <Upload />
            </Route>
            {/*---------------------------------HomePage--------------------*/}
            <Route path="/:interest?">
              <Home />
            </Route>
          </Switch>
          </LayerContext.Provider>
        </UserContext.Provider>
      </AlertProvider>
    </div>
  );
};

export default App;
