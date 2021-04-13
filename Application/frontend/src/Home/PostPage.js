import React from "react";
//Other import
import { useState, useEffect,useContext } from "react";
//url param
import {useParams } from "react-router";
//Import axios
import axios from "axios";
//Context
import { UserContext } from "../Context/UserContext"
// React form
import { useForm } from "react-hook-form";
//Import component
import HomeButton from "./needToImplementBackEnd/HomeButton"
//Css
import "../Styling/PostPage.css";
const PostPage = (props) => {
  //--------------------------------------------------------------------------------
  const { id } = useParams();
  const [post,setPost]= useState(null)
  //User context: user:{ID,email,Valid}
  const { user, setUser } = useContext(UserContext);
  const { Valid } = user;
  //Like 
  const [likeNo,setLike]= useState(0)
  const [liked,setLiked] = useState(false)
  //Comment 
  const [comments, setComment]= useState({comments:[]})
  //Comment form 
  const { register, handleSubmit } = useForm();
 
  //like comment interaction
  const like_comment_Interaction = ()=>{
    let formData = new FormData()
    formData.append('post_id',id)
    axios.post("http://localhost:8000/api/post_like_comment_update_interaction/",formData,{headers:{'Authorization':"Token "+user.token,'Content-Type':'false'}}).then((res) => {
      console.log(res.data)
    })
  }
  useEffect(()=>{
    axios.get("http://localhost:8000/api/post_get/"+id,{headers:{'Authorization':"Token "+user.token,'Content-Type':'false'}}).then((res) => {
        setLike(res.data.like)
        setPost(res.data)
      }).catch(error=>{
          alert(error)
      });

  },[])
  useEffect(()=>{
    axios.get("http://localhost:8000/api/comments_get/"+id,{headers:{'Authorization':"Token "+user.token,'Content-Type':'false'}}).then((res) => {
        setComment(res.data)
      }).catch(error=>{
          alert(error)
      });
  },[])
  useEffect(()=>{
    let formData = new FormData()
    formData.append("user",user.ID)
    formData.append("post",id)
    axios.post("http://localhost:8000/api/like_check/",formData,{headers:{'Authorization':"Token "+user.token,'Content-Type':'false'}}).then((res) => {
        if(res.data.check){
          setLiked(true)
        }
        else{
          setLiked(false)
        }
      }).catch(error=>{
          alert(error)
      });
    
  },[])
  const Like  = ()=>{
    let formData = new FormData()
    formData.append("user",user.ID)
    formData.append("post",id)
    axios.post("http://localhost:8000/api/like/",formData,{headers:{'Authorization':"Token "+user.token,'Content-Type':'false'}}).then((res) => {
        setLike(likeNo+1)
        setLiked(true)
        like_comment_Interaction()
      }).catch(error=>{
          
      });
  }
  const Dislike  = ()=>{
    let formData = new FormData()
    formData.append("user",user.ID)
    formData.append("post",id)
    axios.post("http://localhost:8000/api/dislike/",formData,{headers:{'Authorization':"Token "+user.token,'Content-Type':'false'}}).then((res) => {
        setLike(likeNo-1)
        setLiked(false)
      }).catch(error=>{
          
      });
  }
  const onSubmit = (data) => {
    console.log(data)
    let formData = new FormData()
    formData.append('comment',data.comment)
    formData.append('user',user.ID)
    formData.append('post',id)
    axios.post("http://localhost:8000/api/comment/",formData,{headers:{'Authorization':"Token "+user.token,'Content-Type':'false'}}).then((res) => {
      console.log(res.data)
      let formData = new FormData()
      formData.append("comment_id",res.data.id)
      axios.post("http://localhost:8000/api/comment_get/",formData,{headers:{'Authorization':"Token "+user.token,'Content-Type':'false'}}).then((resp) => {
        let comment_temp = comments.comments
        comment_temp.push(resp.data.comment)
        setComment({...comments,comments:comment_temp})
        like_comment_Interaction()
      })
    })
  };
  return (
    <div className="PostPage">
      <HomeButton/>
      <div className ="post-wrapper">
        <div className="post-author-wrapper">
          {/* input 1 */}
          <div className="profile_pic_wrapper">
          {post?(<img src={"http://localhost:8000"+post.profile.profile_pic}/>):(<div/>)}
          </div>
          {/* input 2 */}
          {post!=null? (<p className="header">{post.user.username}</p>):(<div></div>)}
          <div className="like-wrapper">
            {/* input 3 */}
            <h3 className="like-number">{likeNo}</h3>
            <div className="like-icon">
            {liked?(<img onClick={()=>{Dislike()}} src="https://img.icons8.com/plasticine/44/000000/like--v1.png"/>):(<img onClick={()=>{Like()}} src="https://img.icons8.com/plasticine/44/000000/like--v2.png"/>)}
            </div>
          </div>
        </div>
        {post?(
          <div className="post-image-wrapper">
          {/* input 4 */}
            {post.post?(<img src={"http://localhost:8000"+post.post.image} alt="image is not here" />):(<div/>)}
          </div>
        ):(<div/>)}
      </div>
      <div className="post-comment-wrapper">
        <div className="post-comment-header">
          <h2>Comments</h2>
        </div>
        <div className="post-comment-comments"> 
          
          {
            comments.comments.map((comment,key)=>{
              return (
                <div className="comment-wrapper">
                <div className="comment-author-wrapper">
                  <div className="profile-pic">
                    <img src={"http://localhost:8000"+comment.profile.profile_pic}/>
                  </div>
                  <div className="username"><h3>{comment.user.username}</h3></div>
                </div>
                <div className="comment" id={"comment-"+comment.id}>
                  <p> {comment.comment}</p>
                </div>
              </div>
              )
            })
          }
        </div>
        <form className="comment-form" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
            <input className="comment-input" name="comment" type="text" ref={register({ required: true })} />
        <input className="submitButton" type="submit" />
        </form>
      </div>

    </div>
  );
};

export default PostPage;
