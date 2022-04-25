import React, { useState,useEffect } from "react";
//import "pure-react-carousel/dist/react-carousel.es.css";
import Modal from "antd/lib/modal/Modal";
import axios from "axios";
import { Button, Upload } from "antd";

export default function Grid({ isModalVisible, setModalVisible , name }) {

const close = () => {
    setModalVisible(false);
}
const [scrape , setScrape] = useState([]);
async function getItems () {
    try {
        await axios
            .post("http://localhost:3000/spacetune/api/shop/scrape", {
              name
            })
            .then((res) => {
              console.log(res, "res");
              setScrape(res.data);
            });
          
        
          
        } catch (err) {
          console.log(err, "error");
        }
}

useEffect(()=>{
    getItems();
  },[]);



    return (
        
        <div className=" mx-auto container px-6 xl:px-0 py-12">
            <div className="flex flex-col">
                
                <div className="mt-10 grid lg:grid-cols-2 gap-x-8 gap-y-8 items-center">
                { 
              scrape.map((item, i) => ( 
              <div key = {i} className="group group-hover:bg-opacity-60 transition duration-500 relative bg-gray-50 sm:p-28 py-36 px-10 flex justify-center items-center">
                        <img onClick={() => window.open("https://www.gear4music.com/"+item.url)} className="group-hover:opacity-60 transition duration-500" src={item.image} alt="sofa-2" />
                        <div className="absolute sm:top-8 top-4 left-4 sm:left-8 flex justify-start items-start flex-col space-y-2">
                            <div>
                                <p className="group-hover:opacity-60 transition duration-500 text-xl leading-5 text-gray-600">{item.title}</p>
                            </div>
                            <div>
                                <p className="group-hover:opacity-60 transition duration-500 text-xl font-semibold leading-5 text-gray-800">${item.price}</p>
                            </div>
                        </div>
                        
                        
                    </div>
              ))}
              </div>      
                   
                   
             </div>       
            </div>   );
}