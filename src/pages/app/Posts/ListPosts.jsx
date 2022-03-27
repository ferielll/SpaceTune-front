import axios from "axios";
import React, { useState , useEffect } from "react";
import Post from '../Post/Post';
import "./posts.css"

export default function ListPosts({posts}) {


  return (
   <div  className="posts">
     {posts.map((p)=>(
     <Post post={p}/>
      ))}
   </div>
  )
}
