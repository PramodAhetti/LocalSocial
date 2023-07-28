import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const Posts = (props) => {
  let curpost=useRef(); 
  let user=useSelector(state=>state.user);
 useEffect(()=>{
  if(user.id===props.post.owned_id) {
    curpost.current.style.float="right";
    curpost.current.style.clear="both";
}else{
  
  curpost.current.style.float="left";
  curpost.current.style.clear="both";
}
 },[props])

  return (
    <div ref={curpost} className='postbox'>
         <sub className='user'>{props.post.name}</sub>
         <sub className='message'>{" : "+props.post.message}</sub>
 
    </div>

  );

};

export default Posts;