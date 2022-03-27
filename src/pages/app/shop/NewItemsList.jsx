import axios from "axios";
import dayjs from "dayjs";
import React from "react";
import { useQuery } from "react-query";
import Breadcrumb from "../../../components/Breadcrum";
import InputSearch from "../../../components/InputSearch";
import Title from "../../../components/Title";
import { UserAvatar } from "../../../components/UserAvatar";
import useLightBox from "../../../hooks/useLightBox";
import LightBox from "../../../components/LightBox";

function NewItemsList() {

 

  const handleClick = (id) => {
    fetch('http://localhost:3000/spacetune/api/shop/delete/' + id, {
      method: 'DELETE'
    })
  }
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
  } = useQuery(["fetchNewItemsList"], () =>
    axios
      .get("http://localhost:3000/spacetune/api/shop/getNewItems")
      .then((res) => res.data)
  );

  return (
    <div>
    
      <div className="flex flex-row pt-1">
        <section className="mt-6 mx-auto px-2 max-w-screen-xl lg:px-4">
          <div className="flex justify-between text-start">
            <Title
              title="List of items"
              subtitle="Here you find all items."
            />
            <InputSearch />
          </div>
          <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {!isLoading &&
              items.map((item, key) => (
                <div
                  className="max-w-md w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm"
                  key={key}
                >
                  {/* LightBox component, images can be [String] == group of images || String */}
                  {lightBox.isLightBoxOpen && images && (
                    <LightBox
                      images={images}
                      {...lightBox}
                      closePortal={lightBox.close}
                    />
                  )}
                  <a href="">
                    <img
                      onClick={lightBox.open}
                      src={item.photos}
                      loading="lazy"
                      alt={item.name}
                      className="w-full h-48 rounded-t-md"
                    />
                    
                    <div className="pt-3 ml-4 mr-2 mb-3">
                      <h3 className="text-xl text-gray-900">{item.name}</h3>
                      <h5 className="text-xl text-gray-600"> price: {item.price}</h5>
                      <p className="text-gray-400 text-sm mt-1">
                        {item.description}
                      </p>
                      <button >Order now</button>
                    </div>
                    {/* <button onClick={()=>handleClick(item._id)}>delete</button> */}
                  </a>
                </div>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default NewItemsList;
