import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Near from "./nearpost";
import NewPost from "./newpost";

export default function Home() {
  let navigate=useNavigate();

  return (
    <>
    <div className="logo" onClick={()=>{navigate('/about')}}></div>
    <p className="Gs">Get started</p>
    </>
  );
}
