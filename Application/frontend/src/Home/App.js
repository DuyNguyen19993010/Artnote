import React from "react";
import { useState } from "react";
import Home from "./needToImplementBackEnd/Home";
import UserHome from "./needToImplementBackEnd/UserHomePage";
import { Route, Switch } from "react-router-dom";
//-----------------------------User context
import { UserContext } from "../Context/UserContext";
import { LayerContext } from "../Context/LayerContext";
//-----------------------------Pages
import Welcome from "./needToImplementBackEnd/Welcome"
import PostPage from "./PostPage";
import RoomList from "./needToImplementBackEnd/RoomList"
//-----------------------------Room---------------------
import Room from "../Room/Room";
//------------------------------Router------------------
import { useHistory } from "react-router";
//------------------------------Alert
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
//--------------------------------Css
import "../Styling/App.css";
//--------------------------------------------------------------------------
const App = () => {
  const  history  = useHistory();
  const [user, setUser] = useState({
    ID: "",
    username: "",
    Valid: false,
    profile:null,
    token: null
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
            <Route path="/user/:user_id">
              {/* {user.Valid? (<UserHome />):(history.push('/'))} */}
              <UserHome />
            </Route>
            {/*----------------------------------Drawing mode---------------------------------*/}
            
            <Route path="/RoomList/:filter">
              
              {user.Valid? (<RoomList/>):(history.push('/'))}
            </Route>

            {/*----------------------------------Room---------------------------------*/}
            
            <Route path="/Room/:roomID">
              {user.Valid? (<Room/>):(history.push('/'))}
            </Route>
            
            {/*---------------------------------Post page--------------------------*/}
            <Route path="/post/:id">
              <PostPage />
            </Route>
            {/*---------------------------------HomePage--------------------*/}
            <Route path="/Home/:interest?">
              <Home />
            </Route>
            {/*---------------------------------Register/Login--------------------*/}
            <Route path="/">
                <Welcome/>              
            </Route>
          </Switch>
          </LayerContext.Provider>
        </UserContext.Provider>
      </AlertProvider>
      {/* <a href="https://icons8.com/icon/U5AcCk9kUWMk/enter">Enter icon by Icons8</a>
      <a href="https://icons8.com/icon/dAcwnJsJdfDH/export">Export icon by Icons8</a>
      <a href="https://icons8.com/icon/103162/plus">Plus icon by Icons8</a> */}
    </div>
  );
};

export default App;
