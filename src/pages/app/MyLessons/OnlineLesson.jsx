import { PlusIcon } from "@heroicons/react/outline";
import { Button, DatePicker } from "antd";
import Modal from "antd/lib/modal/Modal";
import axios from "axios";
import dayjs from "dayjs";
import React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Input from "../../../components/form/Input";
import TextArea from "../../../components/form/textArea";
import { useLoading } from "../../../hooks/useLoading";

export default function OnlineLesson({ refetch, onlineLesson }) {
  //state
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <div className="mt-8">
      <h1 className="text-2xl font-semibold"> Online lesson(s) :</h1>
      <div className="mt-3 grid border divide-x divide-y rounded-xl overflow-hidden sm:grid-cols-2 lg:divide-y-0 lg:grid-cols-3 xl:grid-cols-4">
        <div className="relative group bg-gray-100 transition hover:z-[1] hover:shadow-2xl lg:hidden xl:block">
          <div
            onClick={() => setModalVisible(true)}
            className="justify-center relative h-full p-8 space-y-8 border-dashed rounded-lg cursor-pointer transition duration-300 group-hover:bg-white group-hover:border group-hover:scale-90"
          >
            <div className="flex justify-center group-hover:text-blue-600">
              <PlusIcon className="w-10 h-10" />
            </div>
            <div className="flex justify-center">
              <h3 className=" text-lg text-gray-800 font-medium transition group-hover:text-blue-600">
                Add online lesson
              </h3>
              {isModalVisible && (
                <ModalOnlineLesson
                  refetch={refetch}
                  setModalVisible={setModalVisible}
                  isModalVisible={isModalVisible}
                />
              )}
            </div>
          </div>
        </div>
        {onlineLesson?.length !== 0 &&
          onlineLesson.map((lesson, index) => (
            <div
              key={index}
              className="relative group bg-white transition hover:z-[1] hover:shadow-2xl"
            >
              <div className="relative p-8 space-y-8">
                <div className="space-y-2">
                  <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-blue-600">
                    {lesson.name}
                  </h5>
                  <p className="text-sm text-gray-600">{lesson.description}</p>
                </div>
                <div
                  href="#"
                  className="flex justify-between items-center group-hover:text-blue-600"
                >
                  <span className="text-sm">
                    Date : {dayjs(lesson.date).format("MMM DD YYYY HH:mm")}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

const ModalOnlineLesson = ({ refetch, setModalVisible, isModalVisible }) => {
  //handle params
  const { id } = useParams();
  //loading subscribe
  const { isLoading, startLoading, stopLoading } = useLoading(false);
  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    mode: "onChange",
  });
  //Update training
  async function addOnlineLesson(data) {
    startLoading();
    await axios({
      method: "put",
      url: `http://localhost:3000/spacetune/api/formation/addOnlineLesson/${id}`,
      data: data,
    });
    stopLoading();
    setModalVisible(false);
    refetch();
  }
  return (
    <Modal
      title="Add online lesson"
      visible={isModalVisible}
      width="500px"
      onCancel={() => setModalVisible(false)}
      centered
      footer={[
        <Button
          loading={isLoading}
          onClick={handleSubmit(addOnlineLesson)}
          className={` text-white text-sm font-medium py-1 px-4 mr-4 rounded-lg transition-duration-200
                           shadow-md bg-blue-600 `}
        >
          Confirm
        </Button>,
      ]}
    >
      <div>
        <Controller
          name="name"
          control={control}
          rules={{
            required: `Enter your name.`,
          }}
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              label="Name"
              placeholder="name"
              hasError={invalid}
              error={error && error.message}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          rules={{
            required: `Enter your description.`,
          }}
          render={({ field, fieldState: { invalid, error } }) => (
            <TextArea
              {...field}
              label="Description"
              placeholder="Write a description"
              hasError={invalid}
              error={error && error.message}
            />
          )}
        />
        <Controller
          name="date"
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <>
              <label className="block mb-1 text-sm font-semibold text-gray-700">
                Date
              </label>
              <DatePicker {...field} showTime />
            </>
          )}
        />
      </div>
    </Modal>
  );
};
