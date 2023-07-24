import React, { useState, useEffect,useRef } from 'react';
import Posts from './posts';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';


export default function Chat() {
  const user = useSelector(state => state.user);
  const [reload, setReload] = useState(0);
  const allPosts=useSelector(state=>state.posts)
  const dispatch=useDispatch();
  let message=useRef();


  const newpost = async () => {
    try {
      let data = {
        message: message.current.value,
        token: user.token
      };
      await axios.post('https://dev-book.onrender.com/post/new', data);
      setReload(!reload);
    } catch (error) {
      alert(error.response.data.err);
    }
  };



  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let response = await axios.post('https://dev-book.onrender.com/post/all', { token: user.token });
        response=response.data;
        console.log(response);
        dispatch({type:'SETPOSTS',payload:response});
      } catch (error) {
         console.log(error);
      }
    };

    fetchPosts();

    const interval = setInterval(fetchPosts, 30000);

    return () => {
      clearInterval(interval);
    };
  }, [reload,user.name]);




  return (
    <>
      
      <div className='chatbox'>
         <div className='title chat-title'>CHAT</div>
         <br></br>
        {allPosts.map(postss => (
          <Posts key={postss._id} post={postss} />

         ))}
      </div>
      <div className='newpostbox'>
        <input className="message"  ref={message} id='message'></input>
        <button className="button" onClick={newpost} >submit</button>
      </div>
    </>
  );
}
