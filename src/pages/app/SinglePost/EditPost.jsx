import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import axios from "axios";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "../../../components/form/Input";
import { useLoading } from "../../../hooks/useLoading";
import { useUser } from "../../../hooks/useUser";

function EditPost({ item, isModalVisible, setModalVisible, refetch }) {
  //helpers
  const { user } = useUser();
  const { isLoading, startLoading, stopLoading } = useLoading(false);
  const { handleSubmit, control } = useForm({
    defaultValues: {
        subject: item.subject,
        content: item.content,
        title: item.title,
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    startLoading();
    const { subject, content, title } = data;
    //const teacher = user._id;
    try {
      await axios
        .put(
          `http://localhost:3000/spacetune/api/post/update/${item._id}`,
          {
            subject,
            content,
            title,
          }
        )
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
      title="Edit post"
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
      </div>
    </Modal>
  );
}

export default EditPost;
