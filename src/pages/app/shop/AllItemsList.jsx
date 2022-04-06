import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect,Fragment, useState } from "react";
import { DotsVerticalIcon, TrashIcon } from "@heroicons/react/outline";
import { Menu, Transition } from "@headlessui/react";
import InputSearch from "../../../components/InputSearch";
import Title from "../../../components/Title";
import NewItem from "./NewItem";
import useLightBox from "../../../hooks/useLightBox";
import LightBox from "../../../components/LightBox";
import { NavLink } from "react-router-dom";
import { EditIcon } from "evergreen-ui";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
function AllItemsList(props) {
  //states
  const [cart, setCart] = useState([true]);
  const [items,setItems ]= useState([]);
  const url = 'http://localhost:3000/spacetune/api/shop/'+props.strr;
  const getAllItems = () => {
    axios.get(url)
    .then((response)=>{
      const allItems = response.data;
      console.log(response);
      setItems(allItems);
    })
    .catch(error=> console.error("erreur"))
  }

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
  useEffect(()=>{
    getAllItems();
  },[props]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  //select item to delete
  const [selectedItem, setSelectedItem] = useState(null);
  
  //  const{
  //   data: items,
  //   isError,
  //   isLoading,
  // } = useQuery(["fetchAllItemsList"], () =>
  
  //   axios
  //     .get("http://localhost:3000/spacetune/api/shop/"+props.strr)
  //     .then((res) => res.data)

  //     );


  async function deleteItem(selectedItem) {
    
    await axios.delete(
      `http://localhost:3000/spacetune/api/shop/delete/${selectedItem._id}`
    );
   
    setShowDeleteModal(false);
    setSelectedItem(null);
    getAllItems();
  }

  return (
    
    <div>
      <div className="flex flex-row justify-center pt-1 mx-auto">
        <div className="mt-6  px-2 w-full max-w-7xl lg:px-4">
          <div className="flex justify-between text-start w-full">
            <Title title="List of items" subtitle="Here you find all items." />
            <InputSearch />
            {showDeleteModal && (
            <ConfirmModal
              title={`Are you sure to delete "${selectedItem.name}" ?`}
              confirmButton="Delete"
              cancelButton="Cancel"
              onClickCancel={() => setShowDeleteModal(false)}
              onClickConfirm={() => deleteItem(selectedItem)}
            />
          )}
            <button
                onClick={() => setModalVisible(true)}
                className={`text-base leading-6 font-medium py-1 px-4 mr-4 rounded-lg tracking-wide shadow-md bg-navbar-color text-gray-100`}
              >
                Add new training
              </button>
          </div>
          {isModalVisible && (
              <NewItem
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible}
             
              />
            )}
          <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            { 
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
                  /><br></br>
                 <Menu
                      className="flex justify-end items-center relative"
                      as="div"
                    >
                      <div>
                        <Menu.Button className="flex cursor-pointer p-1 text-gay-500">
                          <DotsVerticalIcon className="w-6 h-5 " />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute z-50 w-24 mt-14 origin-bottom bg-white divide-y divide-gray-100 rounded-md shadow-xl right-5 ring-2 ring-gray-900 ring-opacity-5 focus:outline-none">
                          <div className="px-1 py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => {
                                    setShowEditModal(true);
                                    setSelectedItem(items);
                                  }}
                                  className={`${
                                    active ? `bg-gray-100` : "text-gray-700"
                                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                >
                                  <>
                                    <EditIcon
                                      className={`w-5 h-5 mr-2 text-blue-500`}
                                      aria-hidden="true"
                                    />
                                    Edit
                                  </>
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                          <div className="px-1 py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active ? "bg-gray-100 " : "text-gray-700"
                                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                  onClick={() => {
                                    setShowDeleteModal(true);
                                    setSelectedItem(item);
                                  }}
                                >
                                  <>
                                    <TrashIcon
                                      className={`w-5 h-5 mr-2 text-red-500`}
                                      aria-hidden="true"
                                    />
                                    Delete
                                  </>
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
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
                    <NavLink
                      className="px-4 py-2 text-sm font-medium text-center text-white rounded-xl transition-colors duration-150 bg-blue-600 border border-transparent active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                      // onClick={(e) => addToCart(e, item)}
                      to = {"/app/shop/productDetail"}
                    >
                      Order now
                    </NavLink>
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
