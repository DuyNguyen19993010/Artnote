import React from "react";
import {useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { useForm } from "react-hook-form";
import "../../Styling/form.css";
import axios from "axios";
const Register = (props) => {
  //User context
  const { user, setUser } = useContext(UserContext);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    let formData = new FormData()
    //Check if 2 passwords are the same
    if(data.password1 === data.password2){
      formData.append('username',data.username)
      formData.append('password',data.password1)
      //Send credentials to server
      axios.post("http://localhost:8000/api/user/",formData).then((res) => {
        console.log(res.data);

        // Get token from server
        axios.post("http://localhost:8000/auth/",formData).then((resp) => {
          console.log(resp.data);
          setUser({ ...user, Valid:true,token: resp.data.token ,ID:resp.data.id });
          props.setRegStage(true)
        }).catch(er => {
          if(er.response.status === 400){
            alert("User already existed")
          }  
          else if(er.response.status !== 400 && er.response.status !== 200){
            alert("Please log in")
          } 
        })

      }).catch(error => {
        if(error.response.status === 400){
          alert("User already existed")
        }else if(error.response.status !== 400 && error.response.status !== 200){
            alert("Please log in")
          } 
      })
    }
    else{
      alert("Passwords are not the same")
    }
  };


  return (
    <div className="Register">
      <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>

        <label>Username: </label>
        
        <input name="username" type="text" ref={register({ required: true })} />

        <br />

        <label>Password: </label>
        <input name="password1" type="password" ref={register({ required: true })} />

        <br />

        <label>Confirm Password: </label>
        <input name="password2" type="password" ref={register({ required: true })} />
        <br />
        <input className="submitButton" type="submit" />
      </form>
    </div>
  );
};

export default Register;
