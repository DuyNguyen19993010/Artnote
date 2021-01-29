import React from "react";
import { useState, useContext } from "react";
import { NavLink, Link, Route, BrowserRouter, Switch } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../Context/UserContext";
import { useForm } from "react-hook-form";
import "../../Styling/form.css";
import axios from "axios";
const Register = (props) => {
  //User context
  const { user, setUser } = useContext(UserContext);
  const { Valid } = user;
  //useHistory
  const { history } = useHistory();
  //use location
  const { pathname } = useLocation();
  const { register, handleSubmit, errors } = useForm();
  const [options, setOption] = useState({
    list: [
      { id:"1",name: "All", toggled: false },
      { id:"2",name: "Illustrastion", toggled: false },
      { id:"3",name: "2D", toggled: false },
    ],
  });
  var interestToSend = [];
  const onSubmit = (data) => {
    let formData = new FormData()
    if(data.password1 == data.password2){
      formData.append('username',data.username)
      formData.append('password',data.password1)
      axios.post("http://localhost:8000/api/user/",formData).then((res) => {
        console.log(res.data);
        // Get token from server
        axios.post("http://localhost:8000/auth/",formData).then((resp) => {
          console.log(resp.data);
          setUser({ ...user, token: resp.data.token ,ID:resp.data.id });
        }).catch(er => {
          if(er.response.status == 400){
            alert("User already existed")
          }  
          else if(er.response.status != 400 && er.response.status != 200){
            alert("Please log in")
          } 
        })

      }).catch(error => {
        if(error.response.status == 400){
          alert("User already existed")
        }else if(error.response.status != 400 && error.response.status != 200){
            alert("Please log in")
          } 
      })
    }
    else{
      alert("Passwords are not the same")
    }
  };

  const addRemove = (key) => {
    let interestList = [...options.list];
    if (!interestList[key].toggled) {
      interestList[key].toggled = true;
      interestToSend.push(interestList[key].name);
    } else {
      interestList[key].toggled = false;
      for (let i = 0; i < interestToSend.length; i++) {
        if (interestToSend[i] == interestList[key].name) {
          interestToSend.splice(i, 1);
        }
      }
    }
    setOption({ ...options, list: interestList });
  };
  const toggleStyle = (key) => {
    if (options.list[key].toggled) {
      return "interest active";
    } else {
      return "interest inactive";
    }
  };
  const renderInterestList = () => {
    return options.list.map((choice, key) => {
      return (
        <div className={toggleStyle(key)} onClick={() => addRemove(key)}></div>
      );
    });
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
