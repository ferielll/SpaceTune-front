
import "./Post.css";
import { Link } from "react-router-dom";
import Music from "../../../assets/music.png";
import useLightBox from "../../../hooks/useLightBox";
import LightBox from "../../../components/LightBox";

export default function Post({ post }) {
  // custom hook for handle the lightbox component
  const lightBox = useLightBox();
  const images = Music;
  return (
    <div className="max-w-md w-full mx-auto mt-3 shadow-lg border-black rounded-md duration-300 hover:shadow-sm hover:-translate-y-2">
      <div className="postInfo">
        {lightBox.isLightBoxOpen && images && (
          <LightBox
            images={images}
            {...lightBox}
            closePortal={lightBox.close}
          />
        )}
        <img
          onClick={lightBox.open}
          src={`http://localhost:3000/${post.Image}`}
          loading="lazy"
          alt={"Music"}
          className="w-full cursor-pointer"
        />

        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
        <div className="pt-2 ml-4 mr-2 mb-3 cursor-pointer">
          <h3 className="text-xl font-semibold text-gray-900">
            <Link to={`/post/${post._id}`} className="link">
              <span className="postTitle">{post.title}</span>
            </Link>
          </h3>
          <p className="text-gray-500 text-sm mt-1 line-clamp-3">
            {post.content}
          </p>
        </div>
      </div>
    </div>
  );
}
