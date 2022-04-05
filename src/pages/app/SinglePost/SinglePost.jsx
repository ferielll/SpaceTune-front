import { Link, useLocation } from "react-router-dom";
import "./SinglePost.css";
import Music from "../../../assets/music.png";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../../Layout/NavBar";

export default function SinglePost() {
  const location = useLocation();
  //console.log(location.pathname.split("/")[2]);
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://localhost:3000/spacetune/api/post/" + path);
      setPost(res.data);
      console.log(res);
    };
    getPost();
  }, [path]);
  return (
    <div>
      <NavBar />
    <div className="singlePost">
      <div className="singlePostWrapper">
     
        <h1 className="singlePostTitle">
          {post.title}
          <img src={Music} alt="image" className="w-full" />
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"></i>
            <i className="singlePostIcon far fa-trash-alt"></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
            <Link to={`/blogs/?user=${post.username}`} className="link">
                {post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className="singlePostDesc">
          {post.content}
        </p>
      </div>
    </div>
    </div>
  );
}