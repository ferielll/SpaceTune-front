import { CloudUploadOutlined } from "@material-ui/icons";
import { Button, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import Modal from "antd/lib/modal/Modal";
import axios from "axios";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "../../../components/form/Input";
import { useLoading } from "../../../hooks/useLoading";
import { useUser } from "../../../hooks/useUser";

function NewBlog({ isModalVisible, setModalVisible, refetch }) {
  //helpers
  const { user } = useUser();
  const { isLoading, startLoading, stopLoading } = useLoading(false);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      subject: "",
      content: "",
      title: "",
    //  image: "",
      username: ""
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    startLoading();
    const { subject, content, title,  username } = data;
    const user = user._id.name;
    try {
      await axios
        .post("http://localhost:3000/spacetune/api/post/create", {
          subject,
          content,
          title,
          username,
         // user,
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
      title="Add new blog"
      visible={isModalVisible}
      width="350px"
      onCancel={() => setModalVisible(false)}
      centered
      footer={[
        <Button
          loading={isLoading}
          onClick={handleSubmit(onSubmit)}
          className={` text-white text-sm font-medium py-1 px-4 mr-4 rounded-lg transition-duration-200
                           shadow-md bg-blue-600 `}
        >
          Confirm
        </Button>,
      ]}
    >
      <div>
        <Controller
          name="title"
          control={control}
          rules={{
            required: `Enter the title of the blog.`,
          }}
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              label="title"
              placeholder="title"
              hasError={invalid}
              error={error && error.message}
            />
          )}
        />
        <Controller
          name="subject"
          control={control}
          rules={{
            required: `Please enter your subject.`,
          }}
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              label="subject"
              placeholder="Write subject..."
              className="whitespace-pre-wrap"
              hasError={invalid}
              error={error && error.message}
            />
          )}
        />
        <Controller
          name="content"
          control={control}
          rules={{
            required: `Please enter your content.`,
          }}
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              label="content"
              type="text"
              placeholder="content"
              hasError={invalid}
              error={error && error.message}
            />
          )}
        />
        <Controller
          name="username"
          control={control}
          rules={{
            required: `Please enter your username.`,
          }}
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              label="username"
              type="text"
              placeholder="username"
              hasError={invalid}
              error={error && error.message}
            />
          )}
        />
      </div>
    </Modal>
  );
}

export default NewBlog;
