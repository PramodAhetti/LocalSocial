import React, { useEffect, useState } from "react";
import Near from "./near";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector ,useDispatch} from 'react-redux'
export default function Nearpost() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const nearpost=useSelector(state=>state.posts);


  useEffect(() => {
    const fetchData = async () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async function (position) {
          try {
            let response = await axios.post("https://geopost.onrender.com/post/all", {
              token: localStorage.getItem("token"),
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              radius: 0.0001,
            });
            dispatch({type:"SETPOSTS",payload:response.data});
          } catch (error) {
            console.log(error);
            navigate("/login");
          }
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };

    fetchData(); 
  },[]); 

  return (
    <>
      <div className="Title">.GeoPost</div>
      <div className="chatbox">
        {nearpost.map((data) => (
          <Near key={data._id} post={data} />
        ))}
      </div>
    </>
  );
}
