import React from "react";
import { useState, useContext } from "react";
import { NavLink, Link, Route, BrowserRouter, Switch } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../Context/UserContext";
import { useForm } from "react-hook-form";
import "../../Styling/form.css";
import axios from "axios";
const UploadPost = (props) => {
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
      { name: "All", toggled: false },
      { name: "Illustrastion", toggled: false },
      { name: "2D", toggled: false },
    ],
  });
  var interestToSend = [];
  const onSubmit = (data) => {
    data.interest = options.list.map((choice, value) => {
      if (choice.toggled) {
        return choice.name;
      }
    });
    data.interest = data.interest.filter(function (element) {
      return element !== undefined;
    });
    console.log(data);
    // axios.get("http://localhost:8000/users/").then((res) => {
    //   console.log(res.data);
    // });
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
    <div className="UploadArtwork">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Preview images</label>
        <br />
        <input
          name="PreviewImage"
          type="file"
          ref={register({ required: true })}
        />

        <label>Caption</label>
        <br />
        <input name="caption" type="textarea" ref={register} />

        <br />
        <label>Interest</label>
        <br />
        <div className="interests">{renderInterestList()}</div>
        <br />

        <input type="submit" />
      </form>
    </div>
  );
};

export default UploadPost;
