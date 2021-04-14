import React from "react";
import { useState, useContext, useEffect,useCallback } from "react";
//Other import
import {useHistory } from "react-router";
import { useForm } from "react-hook-form";
//Import axios
import axios from "axios";
//Import Context
import { UserContext } from "../../Context/UserContext"
//Import component
import Post from "../Post"
//Import component
import HomeButton from "./HomeButton"
//CSS
import "../../Styling/Home.css";
const Home = (props) => {
  //User context: user:{ID,email,Valid}
  const { user, setUser } = useContext(UserContext);
  //Filter
  const [selectedFilter,selectFilter] = useState("popular")
  //Post list
  const [posts,setPost]= useState({Posts:[]})
  //Indexes for sending GET request                       
  const [latest_postIndex,setLatestIndex] = useState(0)                              
  const [popular_postIndex,setPopularIndex] = useState(0)
  //Can refresh
  const [canRefresh,setRefresh]= useState(true) 
  //toggle create post form
  const [postForm,togglePostForm] = useState(false)
  //Post form 
  const { register, handleSubmit } = useForm();
  //image to post
  const [pic,setPic] = useState()   
  //image data
  const [imgData, setImgData] = useState(null);
  //-----------------------------Get new images-------------------------------------
  const feedNewImages = useCallback(e=>{
    const{key,keyCode}=e;
    if(keyCode ==32 && canRefresh){
      setRefresh(false)
      if(selectedFilter === "latest"){
        axios.get("http://localhost:8000/api/post_latest_get/"+latest_postIndex+"/",{headers:{'Authorization':"Token "+user.token,'Content-Type':'false'}}).then((res) => {
          if(res.data.reset == true){
            setLatestIndex(0)
          }
          else{
            setLatestIndex(latest_postIndex+5)
          }
          setRefresh(true)
          setPost({...posts,Posts:res.data.posts})
        }).catch(error=>{
            alert("Error")
        });
      }
      else{
        axios.get("http://localhost:8000/api/post_popular_get/"+popular_postIndex+"/",{headers:{'Authorization':"Token "+user.token,'Content-Type':'false'}}).then((res) => {
          if(res.data.reset== true){
            setPopularIndex(0)
          }
          else{
            setPopularIndex(popular_postIndex+5)
          }
          setRefresh(true)
          setPost({...posts,Posts:res.data.posts})
        }).catch(error=>{
            alert("Error")
        });
    }
    }
  })
  useEffect(()=>{
    window.addEventListener("keydown",feedNewImages)
    return ()=>{
      window.removeEventListener("keydown",feedNewImages)
    }
  },[feedNewImages])

  //-----------------------------------Change posts based on filter
  useEffect(()=>{
    if(selectedFilter == "latest"){
      axios.get("http://localhost:8000/api/post_latest_get/"+latest_postIndex+"/",{headers:{'Authorization':"Token "+user.token,'Content-Type':'false'}}).then((res) => {
        setPost({...posts,Posts:res.data.posts})
      }).catch(error=>{
          alert("Error")
      });
    }
    else{
      axios.get("http://localhost:8000/api/post_popular_get/"+popular_postIndex+"/",{headers:{'Authorization':"Token "+user.token,'Content-Type':'false'}}).then((res) => {
        setPost({...posts,Posts:res.data.posts})
      }).catch(error=>{
          alert("Error")
      });

    }
  },[selectedFilter])
  //Post submit
  const onSubmit = (data) => {
    let formData = new FormData()
    formData.append('image',pic)
    formData.append('user',user.ID)
    axios.post("http://localhost:8000/api/post/",formData,{headers:{'Authorization':"Token "+user.token,'Content-Type':'false'}}).then((res) => {
      console.log(res.data)
    })
  };
  const handleImagePreview = (evt)=>{
    if(evt.target.files[0]){
      setPic(evt.target.files[0])
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(evt.target.files[0])
    }
  }
  const clickInteraction = (id)=>{
    let formData = new FormData()
    formData.append('post_id',id)
    axios.post("http://localhost:8000/api/post_click_interaction/",formData,{headers:{'Authorization':"Token "+user.token,'Content-Type':'false',}}).then((res) => {
      console.log(res.data)
    })
  }
  //--------------------------------------------------------------------------------
  return (
    <div className="Home">
      <HomeButton/>
      {/*---------------------Nav bar-------------------------*/}
      {/* <div className ="navbar-wrapper">

      </div> */}
      {/* -----------------------Create post button---------------------- */}
      { postForm? (<button disabled className="create-post-button">Post an artwork</button>):(<button onClick={()=>{togglePostForm(true)}} className="create-post-button">Post an artwork</button>) }
      {/* --------------------------Post form----------------------- */}
      {postForm?(<div className="post-form-wrapper">
        <button className="close-button" onClick={()=>{togglePostForm(false)}}><img src="https://img.icons8.com/fluent-systems-filled/32/000000/multiply.png"/></button>
      <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
        <div className="image-placeholder">
          <img alt="No image" src={imgData}/>
        </div>
        <br/>
        <input
          onChange = {evt =>{handleImagePreview(evt)}}
          name="image"
          type="file"
          ref={register({ required: true })}
        /> 
        <br/>


        <input className="submitButton" type="submit" />
      </form>
      </div>):(<div></div>)}
      {/*-------------------------MAIN BODY------------------------*/}
      <div className="feed-area ">
        {selectedFilter=="popular"?(<div className="filter-wrapper">
          <button className="filter active" id="popular-filter">Popular</button>
          <button className="filter" id="latest-filter" onClick={()=>{selectFilter("latest")}}>Latest</button>
        </div>):(<div className="filter-wrapper">
          <button className="filter" id="popular-filter" onClick={()=>{selectFilter("popular")}}>Popular</button>
          <button className="filter active" id="latest-filter">Latest</button>
        </div>)}
        <div className="posts">
          {
            posts.Posts.map((post,key)=>{
              return <div onClick={()=>{clickInteraction(post.id)}} className={"post-"+key}><Post type={key} post={post}/></div>
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Home;
