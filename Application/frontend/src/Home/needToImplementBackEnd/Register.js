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
    // data.interest = options.list.map((choice, value) => {
    //   if (choice.toggled) {
    //     return choice.name;
    //   }
    // });
    // data.interest = data.interest.filter(function (element) {
    //   return element !== undefined;
    // });
    let formData = new FormData()
    formData.append('username',data.username)
    formData.append('password1',data.password1)
    formData.append('password2',data.password2)
    formData.append('fname',data.fname)
    formData.append('lname',data.lname)
    formData.append('location',data.location)
    formData.append('occupation',data.occupation)
    formData.append('aboutMe',data.aboutMe)
    console.log(data);
    axios.post("http://localhost:8000/registration_view/",formData).then((res) => {
      console.log(res.data);
      setUser({ ...user, Valid: true, ID: res.data.id });
    });
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
        <label>FirstName</label>
        <br />
        <input
          name="fname"
          type="text"
          ref={register({ required: true, minLength: 2 })}
        />

        <br />

        <label>LastName</label>
        <br />
        <input
          name="lname"
          type="text"
          ref={register({ required: true, minLength: 2 })}
        />

        <br />

        <label>Username</label>
        <br />
        <input name="username" type="text" ref={register({ required: true })} />

        <br />

        <label>Password</label>
        <br />
        <input name="password1" type="password" ref={register({ required: true })} />

        <br />

        <label>Confirm Password</label>
        <br />
        <input name="password2" type="password" ref={register({ required: true })} />

        <br />

        <label>Occupation</label>
        <br />
        <input name="occupation" type="text" ref={register} />

        <br />

        <label>Location</label>
        <br />
        <input name="location" type="text" ref={register} />

        <br />

        <label>About me:</label>
        <br />
        <input name="aboutMe" type="textarea" ref={register} />

        <br />

        {/* <label>Interest</label>
        <br />

        <div className="interests">{renderInterestList()}</div>
        <br /> */}

        {/* <label>Preview images</label>
        <br />
        <input
          name="profile_pic"
          type="file"
          ref={register({ required: true })}
        /> */}
        <input type="submit" />
      </form>
    </div>
  );
};

export default Register;
