import React from "react";
import {useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import "../../Styling/form.css";
import axios from "axios";
const Login = (props) => {
  //User context
  const { user, setUser } = useContext(UserContext);
  //useHistory
  const  history  = useHistory();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    let formData = new FormData()
    formData.append('username',data.username)
    formData.append('password',data.password)
    axios.post("http://localhost:8000/auth/",formData).then((res) => {
      if(res.data){
        console.log(res.data)
        var my_token = res.data.token
        axios.get("http://localhost:8000/api/profile_get/"+res.data.id+"/",{headers:{'Authorization':"Token "+my_token,'Content-Type':'false'}}).then(resp=>{
        if(resp.data.Message!=="You are not authorized"){
          setUser({ ...user, Valid: true, token: my_token,profile:resp.data.profile ,ID:resp.data.user.id,username:resp.data.user.username});
          history.push('/Home/')
        }
        else{
          alert("You are not authorized")
        }
        })
      }
    }).catch(error =>{ 
      if(error.response.status === 400){
        alert("User does not exist or credentials are incorrect")
      }else if(error.response.status !== 400 && error.response.status !== 200){
        alert("Please log in")
      }       
    });
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Username: </label>
 
        <input
          name="username"
          type="text"
          ref={register({ required: true, minLength: 2 })}
        />
        <br />
        <label>Password: </label>
        <input
          name="password"
          type="password"
          ref={register({ required: true, minLength: 2 })}
        />
        <br />
        <input className="submitButton" type="submit" />
      </form>
    </div>
  );
};

export default Login;
