import axios from "axios";
import React, { useState , useEffect } from "react";
import ListPosts from "./ListPosts";
import "./posts.css";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:3000/spacetune/api/post/getAll");
      setPosts(res.data);
     //console.log(res)
    };
    fetchPosts();
  }, []);
  //console.log('posts', posts)
  return (
    <div>
      <ListPosts posts={posts}/>
    </div>
  );
}
