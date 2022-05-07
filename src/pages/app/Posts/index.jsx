import axios from "axios";
import React, { useState , useEffect } from "react";
import { useLocation } from "react-router-dom";
import ListPosts from "./ListPosts";
import "./posts.css";
import { useQuery } from "react-query";
import { useUser } from "../../../hooks/useUser";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();
  const { user } = useUser();
  const [refetch, setRefetch] = useState(0);  
  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:3000/spacetune/api/post/getAll" + search);
    setPosts(res.data);
   //console.log(res)
  };
  //console.log(location);
  useEffect(()=>{
    fetchPosts();
  },[refetch]);
  useEffect(() => {
    
    fetchPosts();
  }, [search]);
  
  //console.log('posts', posts)
  return (
    <div>
      <ListPosts posts={posts} setRefetch = {setRefetch}
                refetch={refetch}/>
    </div>
  );
}
