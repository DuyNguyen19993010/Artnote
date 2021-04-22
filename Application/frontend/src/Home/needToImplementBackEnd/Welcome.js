import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
//-------------------Forms----------------------
import Register from "./Register"
import Login from "./Login"
import ProfileForm from "./ProfileForm"
//Images
import post_feature from "../../Image component/Post-feature.png"
import canvas_feature from "../../Image component/Canvas-feature.png"
import room_lobby_feature from "../../Image component/Room-lobby.png"
//------------------CSS---------------------
import "../../Styling/Welcome.css";
const Welcome = (props) => {
    //User context
    const { user, setUser } = useContext(UserContext);
    //Display 2nd registration stage if register successfully  
    const [showRegStage,setRegStage]  = useState(false)

    const secondStageReg = (value)=>{
        setRegStage(value)
    }
  return (
    <div className="welcome">
        <div className="header">
            <div className = "banner">
                <h1>ArtNote</h1>
            </div> 
            <div className = "Account-area">
                    {!showRegStage? (<div className ="Form"><div className ="RegisterForm">
                        <h1 className="FormName">Register</h1>
                        <Register setRegStage= {secondStageReg}/>
                    </div>
                    <div className= "verticalLine"></div> 
                    <div className ="LoginForm">
                        <h1 className="FormName">Log in</h1>
                        <Login/>
                    </div></div>):(<div className ="RegFormSec Form">
                            <div className ="RegisterSecForm">
                        <h1 className="FormName">Your information</h1>
                        <ProfileForm />
                    </div>
                    </div>)}
                    {/* <div className ="RegFormSec Form">
                            <div className ="RegisterSecForm">
                        <h1 className="FormName">Your information</h1>
                        <ProfileForm />
                    </div>
                    </div> */}

            </div>
        </div>
        <div className="introduction">
            <h1 className="our-greeting">Our greetings to you</h1>
            <div className="brief-intro-wrapper">
                <div className="image-wrapper">
                    <img src="https://media.istockphoto.com/photos/talented-female-artist-works-on-abstract-oil-painting-using-paint-picture-id1183183791?k=6&m=1183183791&s=612x612&w=0&h=Rsr0JRbsti2VVTb-6vTkad7heWFBkAZCEuXf3US_3Ro="/>
                </div>
                <div className="text-area">
                    <p>
                        Welcome! Artnote is a web application that ecourages sharing and socialization among artists.<br/> The goal of the application is to create a platform, where artists could freely and easily interact with each other through chatting and painting.<br/> In addition, we also hope to bring artists together through sharing and interacting with each other's artworks.<br/>
                    </p>

                </div>
            </div>
        </div>   
        <div className="features-explaination">
            <h1 className="feature-banner">Our offering</h1>
            <div className="features-wrapper">
                <div className="feature">
                    <div className="image">
                        <img src={post_feature}/>
                    </div>
                    <div className="text-area">
                        <h3>Gallery</h3>
                        <p>
                            Artists can have their own gallery to store their artworks and share them with other artists. Bring you art closer to other! 
                        </p>
                    </div>
                </div>
                <div className="feature">
                    <div className="image">
                        <img src={canvas_feature}/>
                    </div>
                    <div className="text-area">
                        <h3>Canvas</h3>
                        <p>
                            Artists can gather around and draw together on the same canvas in real time with their drawing privacy managed by our layering system.  
                        </p>
                    </div>
                </div>
                <div className="feature">
                    <div className="image">
                        <img src={room_lobby_feature}/>
                    </div>
                    <div className="text-area">
                        <h3>Room lobby</h3>
                        <p>
                            Artists can create their own chat and painting and other can join in that painting session.  
                        </p>
                    </div>
                </div>

            </div>
        </div>   
        <div className="footer">
            <h3>
                Bring your art closer!
            </h3>
        </div>     
    </div>
  );
};

export default Welcome;
