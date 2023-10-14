import React, { useEffect, useRef } from "react";

const Near = (props) => {
  return (
    <div className="postbox">
      <sub className="user">{props.post.name}</sub>
      <sub className="message">{" : " + props.post.message}</sub>
    </div>
  );
};

export default Near;