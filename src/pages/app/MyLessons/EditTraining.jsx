import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import axios from "axios";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "../../../components/form/Input";
import { useLoading } from "../../../hooks/useLoading";
import { useUser } from "../../../hooks/useUser";

function EditTraining({ item, isModalVisible, setModalVisible, refetch }) {
  //helpers
  const { user } = useUser();
  const { isLoading, startLoading, stopLoading } = useLoading(false);
  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: item.name,
      description: item.description,
      price: item.price,
      type: item.type,
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    startLoading();
    const { name, description, price, type } = data;
    const teacher = user._id;
    try {
      await axios
        .put(
          `http://localhost:3000/spacetune/api/formation/update/${item._id}`,
          {
            name,
            description,
            price,
            type,
            teacher,
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
      title="Edit training"
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
          name="name"
          control={control}
          rules={{
            required: `Enter name of the training session.`,
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
            required: `Please enter your description.`,
          }}
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              label="Description"
              placeholder="Write description..."
              className="whitespace-pre-wrap"
              hasError={invalid}
              error={error && error.message}
            />
          )}
        />
        <Controller
          name="price"
          control={control}
          rules={{
            pattern: {
              value: /^[0-9]*$/i,
              message: "price should be number",
            },
          }}
          render={({ field, fieldState: { invalid, error } }) => (
            <Input
              {...field}
              label="Price"
              type="text"
              placeholder="price"
              hasError={invalid}
              error={error && error.message}
            />
          )}
        />
        <Controller
          name="type"
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <Input {...field} label="Type" type="text" placeholder="type" />
          )}
        />
      </div>
    </Modal>
  );
}

export default EditTraining;
