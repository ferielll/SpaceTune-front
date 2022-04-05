// import React from 'react'
// import Spacetune from "../../../assets/spacetuneWidth.png";
// import Music from "../../../assets/music.png";
// import {
//   AnnotationIcon,
//   GlobeAltIcon,
//   LightningBoltIcon,
//   ScaleIcon,
// } from "@heroicons/react/outline";
// import { Link } from "react-router-dom";
// import { Footer } from "../home/footer";
// import useLightBox from "../../../hooks/useLightBox";

// export default function Post({post}) {
//     const features = [
//         {
//           name: "Competitive exchange rates",
//           description:
//             "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
//           icon: GlobeAltIcon,
//         },
//         {
//           name: "No hidden fees",
//           description:
//             "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
//           icon: ScaleIcon,
//         },
//         {
//           name: "Transfers are instant",
//           description:
//             "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
//           icon: LightningBoltIcon,
//         },
//         {
//           name: "Mobile notifications",
//           description:
//             "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
//           icon: AnnotationIcon,
//         },
//       ];
//       // custom hook for handle the lightbox component
//       const lightBox = useLightBox();
//       //exemple for test
//       const images = "//placekitten.com/1500/500";
//     /*  const { data: posts, isLoading } = useQuery(["fetchListPosts"], () =>
//         axios.get("http://localhost:3000/spacetune/api/post/getAll")
//           .then((res) => res.data)
//       );*/

//     return (
//         <>
//         <div className="pt-20 lg:pt-[120px] pb-10 lg:pb-20 bg-navbar-color  text-white">
//           <div className="">
//             <div className="flex flex-wrap justify-center mx-4">
//               <div className="w-full px-4">
//                 <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[510px]">
//                   <h2
//                     className="
//                     font-bold
//                     text-3xl
//                     sm:text-4xl
//                     md:text-[40px]
//                     text-dark
//                     mb-4
//                     "
//                   >
//                     Our Recent News
//                   </h2>
//                   <p className="text-base text-gray-300 text-body-color">
//                     There are many variations of passages of Lorem Ipsum available
//                     but the majority have suffered alteration in some form.
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="flex flex-wrap mx-4">
//                   <div className="w-full md:w-1/2 lg:w-1/3 px-4">
//                     <div className="max-w-[370px] mx-auto mb-10">
//                       <div className="rounded overflow-hidden mb-8">
//                       <img src={Music} alt="image" className="w-full" />
//                       </div>
//                       <div>
//                         <span
//                           className="
//                        bg-primary
//                        rounded
//                        inline-block
//                        text-center
//                        py-1
//                        px-4
//                        text-xs
//                        leading-loose
//                        font-semibold
//                        text-white
//                        mb-5
//                        "
//                         >
//                           {new Date(post.createdAt).toDateString()}
//                         </span>
//                         <Link to={`/post/${post._id}`} className="link">
//                         <h3>
//                           <a
//                             href="javascript:void(0)"
//                             className="
//                           font-semibold
//                           text-xl
//                           sm:text-2xl
//                           lg:text-xl
//                           xl:text-2xl
//                           mb-4
//                           inline-block
//                           text-dark
//                           hover:text-primary
//                           "
//                           >
//                             {post.title}
//                           </a>
//                         </h3>
//                         </Link>
//                         <p className="text-base text-body-color">
//                           {post.subject}
//                         </p>
//                       </div>
//                     </div>
//                     <a
//                       href="javascript:void(0)"
//                       className="
//                        inline-block
//                        py-2
//                        px-7
//                        border border-[#E5E7EB]
//                        rounded-full
//                        text-base text-body-color
//                        font-medium
//                        hover:border-primary hover:bg-primary hover:text-black
//                        transition
//                        "
//                     >
//                       View Details
//                     </a>
//                   </div>
//             </div>
//           </div>
//         </div>
//         <div className="py-12 bg-navbar-color text-white">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="lg:text-center">
//               <h2 className="text-base text-indigo-300 font-semibold tracking-wide uppercase">
//                 Spacetune
//               </h2>
//               <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
//                 A better way to send music
//               </p>
//               <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
//                 Lorem ipsum dolor sit amet consect adipisicing elit. Possimus
//                 magnam voluptatum cupiditate veritatis in accusamus quisquam.
//               </p>
//             </div>

//             <div className="mt-10">
//               <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
//                 {features.map((feature) => (
//                   <div key={feature.name} className="relative">
//                     <dt>
//                       <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
//                         <feature.icon className="h-6 w-6" aria-hidden="true" />
//                       </div>
//                       <p className="ml-16 text-lg leading-6 font-medium text-white">
//                         {feature.name}
//                       </p>
//                     </dt>
//                     <dd className="mt-2 ml-16 text-base text-gray-400">
//                       {feature.description}
//                     </dd>
//                   </div>
//                 ))}
//               </dl>
//             </div>
//           </div>
//         </div>
//         <Footer logo={Spacetune} />
//       </>
//     )
// }

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
          src={images}
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
