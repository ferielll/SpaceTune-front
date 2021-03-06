import axios from "axios";
import EditItem from "./EditItem";
import React, { useEffect, Fragment, useState } from "react";
import { DotsVerticalIcon, TrashIcon } from "@heroicons/react/outline";
import { Menu, Transition } from "@headlessui/react";
import InputSearch from "../../../components/InputSearch";
import Title from "../../../components/Title";
import NewItem from "./NewItem";
import useLightBox from "../../../hooks/useLightBox";
import LightBox from "../../../components/LightBox";
import { Link } from "react-router-dom";
import { EditIcon } from "evergreen-ui";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import { useUser } from "../../../hooks/useUser";
function MyItems() {
  //states
  const { user } = useUser();
  const [items, setItems] = useState([]);
  const url = "http://localhost:3000/spacetune/api/shop/findByUser/" + user._id;
  const getAllItems = () => {
    axios
      .get(url)
      .then((response) => {
        const allItems = response.data;
        console.log(response);
        setItems(allItems);
      })
      .catch((error) => console.error("erreur"));
  };

  // useEffect(() => {
  //   sessionStorage.setItem("cart", JSON.stringify(cart));
  // }, [cart]);

  // const handleClick = (id) => {
  //   fetch('http://localhost:3000/spacetune/api/shop/delete/' + id, {
  //     method: 'DELETE'
  //   })
  // }
  // custom hook for handle the lightbox component
  const lightBox = useLightBox();
  //exemple for test
  const images =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVU30iCxprlRMuAsfRA__QRABNExU3R-XZgw&usqp=CAU";
  //useQuery is function from react-query,  1 param key, second param func()
  //we use it for fetch (method get), create update delete we use useMutation instaed of this hook

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  //select item to delete
  const [selectedItem, setSelectedItem] = useState(null);

  const [refetch, setRefetch] = useState(0);
  useEffect(() => {
    getAllItems();
  }, [refetch]);

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
        <div className="mt-4 px-2 w-full max-w-7xl lg:px-4">
          <div className="flex justify-between text-start w-full">
            <div>
              <Title title="My items" subtitle="Here you find your items." />
            </div>
            <div className="flex space-x-5">
              <InputSearch />
              <button
                onClick={() => setModalVisible(true)}
                className={`text-base leading-6 font-medium py-1 px-4 mr-4 rounded-lg tracking-wide shadow-md bg-navbar-color text-gray-100`}
              >
                Add new item
              </button>
            </div>
            {isModalVisible && (
              <NewItem
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible}
                setRefetch = {setRefetch}
                refetch={refetch}
              />
            )}
          </div>
          {showDeleteModal && (
            <ConfirmModal
              title={`Are you sure to delete "${selectedItem.name}" ?`}
              confirmButton="Delete"
              cancelButton="Cancel"
              onClickCancel={() => setShowDeleteModal(false)}
              onClickConfirm={() => deleteItem(selectedItem)}
            />
          )}
          {showEditModal && (
            <EditItem
              isModalVisible={showEditModal}
              setModalVisible={setShowEditModal}
              setRefetch={setRefetch}
              refetch={refetch}
              item={selectedItem}
            />
          )}
          <div className="my-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, i) => (
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
                <br></br>
                <Menu
                  className="flex justify-end items-center relative"
                  as="div"
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
                    src={`http://localhost:3000/${item?.photos}`}
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
                    price: ${item.price}
                  </h5>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="flex justify-start pt-2 ml-4 mr-2 mb-3">
                  <Link
                    className="px-4 py-2 text-sm font-medium text-center text-white rounded-xl transition-colors duration-150 bg-blue-600 border border-transparent active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                    // onClick={(e) => addToCart(e, item)}

                    to="/app/shop/productDetail"
                    state={{ item }}
                  >
                    Detail
                  </Link>
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
export default MyItems;
