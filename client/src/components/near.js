import React, { useEffect, useRef } from "react";

const Near = (props) => {
  const formattedTime = props.post.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  console.log(`Post created at: ${formattedTime}`);
  return (
    <div className="postbox">
      <sub className="user">{props.post.name}</sub>
      <sub className="message">{" : " + props.post.message}</sub>
      <sub className="message">{" : " + formattedTime}</sub>
    </div>
  );
};

export default Near;