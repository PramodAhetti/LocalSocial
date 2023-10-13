import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Near from "./nearpost";
import NewPost from "./newpost";

export default function Home() {
  useEffect(() => {
    getLocation();
  }, []);
  const navigate = useNavigate();
  const [position, setpos] = useState({});
  const [posts, setposts] = useState([]);
  const [New, setnew] = useState(1);
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }

  function showPosition(position) {
    setpos(position);
  }

  let NewPost = async () => {
    getLocation();
    console.log(document.getElementById('message').value)
    console.log(position);
    const token = localStorage.getItem("token");
    try {
      let response = await axios.post("http://localhost:5000/post/new", {
        token: token,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        message: document.getElementById('message').value,
      });
      console.log(response.data)
    } catch (error) {
      console.log(error.response);
      navigate("/login");
    }
  };

  let getPosts = async () => {
    try {
      let response = await axios.post("http://localhost:5000/post/all", {
        token: localStorage.getItem("token"),
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        radius: 2,
      });
      setposts(response.data);
      setnew(0);
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };
  let NewNear = "";
  if (New) {
    NewNear = (
      <div className="loginbox debug">

        <input
          className="LoginInput postmessage"
          id="message"
          placeholder="Type your post"
        ></input>
        <button onClick={NewPost} className="LoginButton">Post</button>

      </div>
    );
  } else {
    NewNear = (
      <div className="chatbox">
        {posts.map((data) => (
          <Near key={data._id} post={data} />
        ))}
      </div>
    );
  }
  return (
    <>
      <div className="Title">.GeoPost.</div>
      <div className="NewPost">
        <button className="NewNear" onClick={()=>{setnew(1)}}>
          New
        </button>
        <button className="NewNear" onClick={getPosts}>
          Near
        </button>
      </div>
      {NewNear}
    </>
  );
}
