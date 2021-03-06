import axios from "axios";
import dayjs from "dayjs";
import { useQuery } from "react-query";
import Breadcrumb from "../../../components/Breadcrum";
import InputSearch from "../../../components/InputSearch";
import Title from "../../../components/Title";
import { UserAvatar } from "../../../components/UserAvatar";
import useLightBox from "../../../hooks/useLightBox";
import LightBox from "../../../components/LightBox";
import capture from "../../../assets/capture.png";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";
import { Fragment, useMemo, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon, TrashIcon } from "@heroicons/react/outline";
import { EditIcon } from "evergreen-ui";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import { useLoading } from "../../../hooks/useLoading";
import NewTraining from "../training/NewTraining";
import EditTraining from "./EditTraining";
import { Empty } from "antd";
import Drawer from "../../../Layout/Drawer";
const navigation = [
  {
    name: "My lessons",
    to: "/",
    current: true,
  },
  {
    name: "Courses & quizzes",
    to: "courses",
    current: false,
  },

  {
    name: "Calendar",
    to: "/calendar",
    current: false,
  },
];

const MyTrainings = () => {
  const [isOpen, setIsOpen] = useState(false);
  //states (modals visibles)
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  //select item to delete
  const [selectedItem, setSelectedItem] = useState(null);
  //helpers
  const { user } = useUser();
  const navigate = useNavigate();
  const {
    isLoading: isDeletingLoading,
    startLoading,
    stopLoading,
  } = useLoading(false);
  // custom hook for handle the lightbox component
  const lightBox = useLightBox();
  //exemple for test
  const images = capture;
  //Fetch List Trainings
  const { data, dataUpdatedAt, isLoading, refetch } = useQuery(
    ["fetchMyLessons"],
    () =>
      axios
        .get(
          `http://localhost:3000/spacetune/api/formation/myLessons/${user._id}`
        )
        .then((res) => res.data)
  );

  const trainings = useMemo(() => {
    if (isLoading) return [];
    return data;
  }, [dataUpdatedAt]);

  async function deleteTraining(selectedItem) {
    startLoading();
    await axios.delete(
      `http://localhost:3000/spacetune/api/formation/delete/${selectedItem._id}`
    );
    stopLoading();
    setShowDeleteModal(false);
    setSelectedItem(null);
    refetch();
  }

  return (
    <Fragment>
      <Breadcrumb
        title={"My lessons"}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        menu={true}
      />
      <div className="flex flex-row">
        <div className={`${isOpen ? "w-1/12" : "w-0"} flex flex-col`}>
          <Drawer
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            navigation={navigation}
          />
        </div>
        <div className={`${isOpen ? "w-11/12" : "w-full"}  p-1`}>
          <div className="flex flex-row justify-center pt-1 mx-auto">
            <div className="mt-4 px-2 w-full max-w-7xl lg:px-4">
              <div className="flex justify-between text-start w-full">
                <div>
                  <Title title="My Lessons" />
                </div>
                <div className="flex space-x-5">
                  <InputSearch />
                  <button
                    onClick={() => setModalVisible(true)}
                    className={`text-base leading-6 font-medium py-1 px-4 mr-4 rounded-lg tracking-wide shadow-md bg-navbar-color text-gray-100`}
                  >
                    Add new training
                  </button>
                </div>
                {isModalVisible && (
                  <NewTraining
                    isModalVisible={isModalVisible}
                    setModalVisible={setModalVisible}
                    refetch={refetch}
                  />
                )}
              </div>
              {showDeleteModal && (
                <ConfirmModal
                  title={`Are you sure to delete lesson "${selectedItem.name}" ?`}
                  confirmButton="Delete"
                  cancelButton="Cancel"
                  onClickCancel={() => setShowDeleteModal(false)}
                  onClickConfirm={() => deleteTraining(selectedItem)}
                />
              )}
              {showEditModal && (
                <EditTraining
                  isModalVisible={showEditModal}
                  setModalVisible={setShowEditModal}
                  refetch={refetch}
                  item={selectedItem}
                />
              )}
              {isLoading || trainings.length === 0 ? (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              ) : (
                <div className="my-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {trainings.map((items, key) => (
                    <div
                      className="max-w-md w-full mx-auto mt-3 shadow-lg border-black rounded-md duration-300 hover:shadow-sm hover:-translate-y-1"
                      key={key}
                    >
                      {lightBox.isLightBoxOpen &&  (
                        <LightBox
                          images={
                            items.image[0].imageURL
                              ? items.image[0].imageURL
                              : images
                          }
                          {...lightBox}
                          closePortal={lightBox.close}
                        />
                      )}
                      <img
                        onClick={lightBox.open}
                        src={
                          items.image[0].imageURL
                            ? items.image[0].imageURL
                            : images
                        }
                        loading="lazy"
                        alt={items.name}
                        className="w-full h-56 object-cover rounded-t-md cursor-pointer"
                      />
                      <div className="flex justify-between">
                        <div className="flex items-center pt-2 ml-4 mr-2">
                          <div className="flex items-center w-10 h-10 rounded-full">
                            <UserAvatar
                              user={items.teacher}
                              rounded={true}
                              size={35}
                            />
                          </div>
                          <div className="ml-3">
                            <span className="block text-gray-900">
                              {items.teacher?.userName}
                            </span>
                            <span className="block text-gray-400 text-sm">
                              {dayjs(items.createdAt).format("MMM DD YYYY")}
                            </span>
                          </div>
                        </div>
                        <Menu
                          className="flex justify-center items-center relative"
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
                                        active
                                          ? "bg-gray-100 "
                                          : "text-gray-700"
                                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                      onClick={() => {
                                        setShowDeleteModal(true);
                                        setSelectedItem(items);
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
                      </div>
                      <div
                        className="pt-2 ml-4 mr-2 mb-3 cursor-pointer"
                        onClick={() => navigate(`details/${items._id}`)}
                      >
                        <h3 className="text-xl font-semibold text-gray-900">
                          {items.name}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1 line-clamp-3">
                          {items.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MyTrainings;
