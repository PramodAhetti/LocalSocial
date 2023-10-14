import React, { useEffect, useState } from "react";
import Near from "./near";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Nearpost() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async function (position) {
          try {
            let response = await axios.post("https://geopost.onrender.com/post/all", {
              token: localStorage.getItem("token"),
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              radius: 2,
            });
            setPosts(response.data);
          } catch (error) {
            console.log(error);
            navigate("/login");
          }
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };

    fetchData(); // Call the fetchData function directly inside useEffect

    // Cleanup function can be added if needed
    // return () => {
    //   cleanup code
    // };
  }, [navigate]); // Dependency array to re-run the effect when `navigate` changes

  return (
    <>
      <div className="Title">.GeoPost</div>
      <div className="chatbox">
        {posts.map((data) => (
          <Near key={data._id} post={data} />
        ))}
      </div>
    </>
  );
}
