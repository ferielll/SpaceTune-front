import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import InputSearch from "../../../components/InputSearch";
import Title from "../../../components/Title";
import NewItem from "./NewItem";
import useLightBox from "../../../hooks/useLightBox";
import LightBox from "../../../components/LightBox";

function AllItemsList() {
  //states
  const [cart, setCart] = useState([]);

  const addToCart = (e, item) => {
    setCart([...cart, item]);
    e.preventDefault();
    console.log(cart);
  };
  useEffect(() => {
    setCart(sessionStorage.getItem("cart"));
  }, []);
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // const handleClick = (id) => {
  //   fetch('http://localhost:3000/spacetune/api/shop/delete/' + id, {
  //     method: 'DELETE'
  //   })
  // }
  // custom hook for handle the lightbox component
  const lightBox = useLightBox();
  //exemple for test
  const images = "//placekitten.com/1500/500";
  //useQuery is function from react-query,  1 param key, second param func()
  //we use it for fetch (method get), create update delete we use useMutation instaed of this hook
  const {
    data: items,
    isError,
    isLoading,
  } = useQuery(["fetchAllItemsList"], () =>
    axios
      .get("http://localhost:3000/spacetune/api/shop/getAll")
      .then((res) => res.data)
  );

  return (
    <div>
      <div className="flex flex-row justify-center pt-1 mx-auto">
        <div className="mt-6  px-2 w-full max-w-7xl lg:px-4">
          <div className="flex justify-between text-start w-full">
            <Title title="List of items" subtitle="Here you find all items." />
            <InputSearch />
          </div>
          <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {!isLoading &&
              items.map((item, i) => (
                <div
                  className="max-w-md w-full mx-auto mt-3 shadow-lg border-black rounded-md duration-300 hover:shadow-sm"
                  key={i}
                >
                  {/* LightBox component, images can be [String] == group of images || String */}
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
                    alt={items.name}
                    className="w-full h-48 rounded-t-md cursor-pointer"
                  />
                  <div className="space-y-1 pt-2 ml-4 mr-2 mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    <h5 className=" font-semibold text-gray-900">
                      price: {item.price}
                    </h5>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex justify-start pt-2 ml-4 mr-2 mb-3">
                    <button
                      className="px-4 py-2 text-sm font-medium text-center text-white rounded-xl transition-colors duration-150 bg-blue-600 border border-transparent active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                      onClick={(e) => addToCart(e, item)}
                    >
                      Order now
                    </button>
                  </div>
                </div>

                // <div
                //   className="max-w-md w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm"
                //   key={key}
                // >
                //   {/* LightBox component, images can be [String] == group of images || String */}
                //   {lightBox.isLightBoxOpen && images && (
                //     <LightBox
                //       images={images}
                //       {...lightBox}
                //       closePortal={lightBox.close}
                //     />
                //   )}
                //   <a href="">
                //     <img
                //       onClick={lightBox.open}
                //       src={item.photos}
                //       loading="lazy"
                //       alt={item.name}
                //       className="w-full h-48 rounded-t-md"
                //     />

                //     <div className="pt-3 ml-4 mr-2 mb-3">
                //       <h3 className="text-xl text-gray-900">{item.name}</h3>
                //       <h5 className="text-xl text-gray-600">
                //         {" "}
                //         price: {item.price}
                //       </h5>
                //       <p className="text-gray-400 text-sm mt-1">
                //         {item.description}
                //       </p>
                //     </div>
                //     {/* <button onClick={()=>handleClick(item._id)}>delete</button> */}
                //   </a>
                //   <center>
                //     {" "}
                //     <button
                //       className="block w-1-2 px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white rounded-2xl transition-colors duration-150 bg-blue-600 border border-transparent active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                //       onClick={(e) => addToCart(e, item)}
                //     >
                //       Order now
                //     </button>
                //   </center>
                // </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default AllItemsList;
