import { CloudUploadOutlined } from "@material-ui/icons";
import { Button, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import Modal from "antd/lib/modal/Modal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import Input from "../../../components/form/Input";
import { useLoading } from "../../../hooks/useLoading";
import { useUser } from "../../../hooks/useUser";

function CommentForm({ isModalVisible, setModalVisible, refetch }) {
  //helpers
  const { user } = useUser();
  const { isLoading, startLoading, stopLoading } = useLoading(false);
  const location = useLocation();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      comment: "",
    },
    mode: "onChange",
  });


  const onSubmit = async (data) => {
    startLoading();
    const { comment } = data;
    const name= user.userName;
    const email= user.email;
    const postowner = user._id;
    const post = location.pathname.split("/")[2];
    try {
      await axios
        .post("http://localhost:3000/spacetune/api/comment/create", {
          user,
          email,
          comment,
          postowner,
          post
        })
        .then((res) => {
          console.log(res, "res");
          if (!res.data.success) {
            stopLoading();
            return;
          }
        });
      stopLoading();
      setModalVisible(false);
      refetch();
    } catch (err) {
      console.log(err, "error");
    }
  };

  return (
    <Modal
      title="Add Comment"
      visible={isModalVisible}
      width="500px"
      onCancel={() => setModalVisible(false)}
      centered
      footer={[
        <Button
          loading={isLoading}
          onClick={handleSubmit(onSubmit)}
          className={` text-white text-sm font-medium py-1 px-4 mr-4 rounded-lg transition-duration-200
                           shadow-md bg-blue-600 `}
        >
          Submit Comment
        </Button>,
      ]}
    >
      <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Leave a Reply</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
      <Controller
          name="comment"
          control={control}
          rules={{
            required: `Enter your comment`,
          }}
          render={({ field, fieldState: { invalid, error } }) => (
            <textarea  
            className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" 
            {...field}
            label="Comment"
            placeholder="comment"
            hasError={invalid}
            error={error && error.message}
            />
          )}
        />
        
      </div>
      </div>
    </Modal>
  );
}

export default CommentForm;
