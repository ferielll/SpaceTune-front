/* This example requires Tailwind CSS v2.0+ */
import {  useState, useEffect } from 'react'
// import { Dialog, Transition } from '@headlessui/react'
// import { XIcon } from '@heroicons/react/outline'
import { useUser } from "../../../hooks/useUser";
import { Link } from "react-router-dom";

import axios from "axios";

export default function Cart() {
   
    const { user } = useUser();
    const[products, setProducts]=useState([]);
    const images = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVU30iCxprlRMuAsfRA__QRABNExU3R-XZgw&usqp=CAU";
    const [price , setPrice]=useState(75);

    const handleClick = (id) => {
        const index = products.indexOf(id);
        const list = products;
        products.splice(index,1)
        
        console.log(products)
        localStorage.setItem("cart", JSON.stringify(products));
        
        //window.location.reload(false);
      };

    useEffect(()=>{
    setProducts(JSON.parse(localStorage.getItem("cart")|| "null"));
    const result = products.reduce((total, currentValue) => total = total + currentValue.price,0);
    setPrice(result);
    },[products]);

    
    
  const [show, setShow] = useState(true);




//   const onSubmit = async (data) => {
    
//     const { name, description, price, type, image } = data;
//     const userID = user._id;
//     try {
//       await axios
//         .post("http://localhost:3000/spacetune/api/order/create", {
//           name,
//           description,
//           price,
//           type,
//           image,
//           teacher,
//         })
//        ;
      
//     } catch (err) {
//       console.log(err, "error");
//     }
//   };






  return (
      <>
          <div>
              <div className="flex items-center justify-center py-8">
                  <button onClick={() => setShow(!show)} className="py-2 px-10 rounded bg-indigo-600 hover:bg-indigo-700 text-white">
                      Open Modal
                  </button>
              </div>
              
                  <div className="w-full h-full bg-black bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0" id="chec-div">
                      <div className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="checkout">
                          <div className="flex md:flex-row flex-col justify-end" id="cart">
                              <div className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen" id="scroll">
                                  <div className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer" onClick={() => setShow(!show)}>
                                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                          <polyline points="15 6 9 12 15 18" />
                                      </svg>
                                      <p className="text-sm pl-2 leading-none">Back</p>
                                  </div>
                                  <p className="text-5xl font-black leading-10 text-gray-800 pt-3">Cart</p>




                                  { 
                                    products.map((product, i) => (
                                       
                                       
                                  <div className="md:flex items-center mt-14 py-8 border-t border-gray-200"   key={i} 
                                  >
                                      
                                      <div className="w-1/4">
                                          <img src= {`http://localhost:3000/${product.photos}`} alt className="w-full h-full object-center object-cover" />
                                      </div>
                                      <div className="md:pl-3 md:w-3/4">
                                          {/* <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">RF293</p> */}
                                          <div className="flex items-center justify-between w-full pt-1">
                                              <p className="text-base font-black leading-none text-gray-800">{product.name}</p>
                                              {/* <select className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none">
                                                  <option>01</option>
                                                  <option>02</option>
                                                  <option>03</option>
                                              </select> */}
                                          </div>
                                          <p className="text-xs leading-3 text-gray-600 pt-2">Type: {product.type}</p>
                                           
                                          <p className="text-xs leading-3 text-gray-600 py-4">Condition: {(() => {
                                             
                                             // setPrice(price+product.price);
          switch(product.isUsed) {
            case true: return "Used";
            case false: return "New";
         
          }
        })()}
        
      
                                           
         
        
        </p>
                                          <p className="w-96 text-xs leading-3 text-gray-600">Description: {product.description}</p>
                                          <div className="flex items-center justify-between pt-5 pr-6">
                                              <div className="flex itemms-center">
                                                  <p className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer" onClick={()=>handleClick(product)}>Remove</p>
                                              </div>
                                              <p className="text-base font-black leading-none text-gray-800">${product.price}</p>
                                          </div>
                                      </div>
                                  </div>

                                    ))}
                                        
                                  
                              </div>
                              <div className="xl:w-1/2 md:w-1/3 xl:w-1/4 w-full bg-gray-100 h-full">
                                  <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
                                      <div>
                                          <p className="text-4xl font-black leading-9 text-gray-800">Summary</p>
                                          <div className="flex items-center justify-between pt-16">
                                              <p className="text-base leading-none text-gray-800">Subtotal</p>
                                              <p className="text-base leading-none text-gray-800">${price}</p>
                                          </div>
                                          <div className="flex items-center justify-between pt-5">
                                              <p className="text-base leading-none text-gray-800">Shipping</p>
                                              <p className="text-base leading-none text-gray-800">$30</p>
                                          </div>
                                          <div className="flex items-center justify-between pt-5">
                                              <p className="text-base leading-none text-gray-800">Tax</p>
                                              <p className="text-base leading-none text-gray-800">$35</p>
                                          </div>
                                      </div>
                                      <div>
                                          <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                                              <p className="text-2xl leading-normal text-gray-800">Total</p>
                                              <p className="text-2xl font-bold leading-normal text-right text-gray-800">${price+75}</p>
                                          </div><center><Link to= "/app/shop/checkout"
                      state={{products,price}}className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white">
                                              Checkout
                                          </Link></center>
                                          
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              
          </div>

          <style>
              {` /* width */
              #scroll::-webkit-scrollbar {
                  width: 1px;
              }

              /* Track */
              #scroll::-webkit-scrollbar-track {
                  background: #f1f1f1;
              }

              /* Handle */
              #scroll::-webkit-scrollbar-thumb {
                  background: rgb(133, 132, 132);
              }
`}
          </style>
      </>
  );
}

