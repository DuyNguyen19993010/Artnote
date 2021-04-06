import React from "react";
import { useState, useContext, useEffect } from "react";
//Other import
import {useHistory } from "react-router";
import { UserContext } from "../../Context/UserContext";
//Import component
import Post from "../Post"
//CSS
import "../../Styling/Home.css";
const Home = (props) => {
  const history = useHistory();
  //User context: user:{ID,email,Valid}
  const { user, setUser } = useContext(UserContext);
  const { Valid } = user;
  const [selectedFilter,selectFilter] = useState("popular")
  const [posts,setPost]= useState({Posts:[]})
  useState(()=>{
    setPost({Posts:[{id:"1",user:{username:"Ruan jian",profile_pic:"https://img.fireden.net/ic/image/1479/28/1479288725496.jpg"},image:"https://i.pinimg.com/originals/72/a0/1d/72a01dafce6b802c4716eaf9274c8018.jpg"},
    {id:"2",user:{username:"Jone Doe",profile_pic:"http://pm1.narvii.com/6170/70553a7fc661fae272020aef43beedf32f4a1d11_00.jpg"},image:"https://i.pinimg.com/originals/60/4f/6d/604f6d753abde8e4e29eea723effcd54.jpg"},
    {id:"3",user:{username:"Toom Crook",profile_pic:"https://news.artnet.com/app/news-upload/2015/12/jesus1.jpg"},image:"https://www.this-is-cool.co.uk/wp-content/gallery/ruan-jia/thumbs/thumbs_the-digital-art-of-ruan-jia-19.jpg"},
    {id:"4",user:{username:"Cia",profile_pic:"https://i.ytimg.com/vi/28qv0hpdeM0/maxresdefault.jpg"},image:"https://cdna.artstation.com/p/assets/images/images/034/253/458/20210127214835/smaller_square/ruan-jia-shangguan-yansheng.jpg?1611805715"},
    {id:"5",user:{username:"Xueng feng",profile_pic:"https://i.pinimg.com/236x/2f/53/0b/2f530b05b4f667924867c52e59a57f9f--yulia-saparniiazova-pose-reference.jpg"},image:"https://64.media.tumblr.com/d1cc8135c6a5ff2067e615204a1da352/ab9ea64226f24bd1-88/s1280x1920/65988ba21dea16702faea267acdfc5c22af15e48.jpg"}]})

  },[posts])
  console.log(selectedFilter)
  //--------------------------------------------------------------------------------
  return (
    <div className="Home">
      {/* ----------------------------Type-------------------------
      <div className="typeList">
        {type.map((type) => {
          return (
            <div  className="type">
              <h2 style={{background:"url(https://cdna.artstation.com/p/assets/images/images/032/172/810/large/nerissa-mercer-lion.jpg?1605674363)"}} className="typeName">
                {type}
              </h2>
            </div>
          );
        })}
      </div> */}


      {/*---------------------Nav bar-------------------------*/}
      {/* <div className ="navbar-wrapper">

      </div> */}
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
              return <div className={"post-"+key}><Post type={key} post={post}/></div>
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Home;
