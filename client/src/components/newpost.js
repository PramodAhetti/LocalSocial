import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Newpost() {
  const navigate = useNavigate();
  let Post = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        console.log(document.getElementById("message").value);
        console.log(position);
        const token = localStorage.getItem("token");
        try {
          let response = await axios.post("https://geopost.onrender.com/post/new", {
            token: token,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            message: document.getElementById("message").value,
          });
          console.log(response.data);
        } catch (error) {
          console.log(error.response);
          navigate("/login");
        }
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      <div className="Title">.GeoPost</div>
      <div className="NewBox debug">
        <br></br>
        <br></br>
        <input
          className="LoginInput  postmessage"
          id="message"
          placeholder="Type your post"
        ></input>
        <br></br>
        <button className="LoginButton" onClick={Post}>
          submit
        </button>
        <br></br>
      </div>
    </>
  );
}
