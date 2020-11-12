import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import UploadPost from "./UploadPost";
const Upload = (props) => {
  //User context
  const { user, setUser } = useContext(UserContext);
  const { Valid } = user;
  const [showPostForm, toggle] = useState(true);
  console.log(showPostForm);
  const active = {
    fontSize: "50px",
    color: "#CD60BB",
    cursor: "pointer",
  };
  const inactive = {
    color: "#9E9A9D",
    cursor: "pointer",
  };
  return (
    <div className="UploadForm">
      {Valid ? (
        <div>
          <div>
            <h1 style={showPostForm ? active : inactive}>
              {" "}
              Post{" "}
            </h1>
          </div>
          <div><UploadPost /></div>
        </div>
      ) : (
        <h1>Please Login first</h1>
      )}
    </div>
  );
};

export default Upload;
