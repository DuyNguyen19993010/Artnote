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
    setUser({ ...user, Valid: true, ID: 1 });
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
    <div className="Register">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>FirstName</label>
        <br />
        <input
          name="firstname"
          type="text"
          ref={register({ required: true, minLength: 2 })}
        />

        <br />

        <label>LastName</label>
        <br />
        <input
          name="lastname"
          type="text"
          ref={register({ required: true, minLength: 2 })}
        />

        <br />

        <label>Email</label>
        <br />
        <input name="email" type="text" ref={register({ required: true })} />

        <br />

        <label>Password</label>
        <br />
        <input name="password" type="text" ref={register({ required: true })} />

        <br />

        <label>Confirm Password</label>
        <br />
        <input name="confirm" type="text" ref={register({ required: true })} />

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
        <input name="location" type="textarea" ref={register} />

        <br />

        <label>Interest</label>
        <br />

        <div className="interests">{renderInterestList()}</div>
        <br />

        <label>Preview images</label>
        <br />
        <input
          name="PreviewImage"
          type="file"
          ref={register({ required: true })}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Register;
