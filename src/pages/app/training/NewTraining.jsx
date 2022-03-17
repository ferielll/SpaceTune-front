import axios from "axios";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "../../../components/form/Input";
import { useLoading } from "../../../hooks/useLoading";

function NewTraining() {
  const { isLoading, startLoading, stopLoading } = useLoading(false);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    startLoading();
    data.teacher = { _id: "622209559c3db32e1c610e61" };
    try {
      await axios
        .post("http://localhost:3000/spacetune/api/formation/create", {
          data,
        })
        .then((res) => {
          console.log(res, "res");
          if (!res.data.success) {
            stopLoading();
            return;
          }
        });
      stopLoading();
    } catch (err) {
      console.log(err, "error");
    }
  };

  return (
    <div className="flex w-1/2 justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/2 p-12 bg-white rounded-2xl"
      >
        <div className="flex justify-center"></div>
        <h1 className="mb-4 text-2xl font-bold text-center">
          Add new training
        </h1>
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
        <button className="block w-1/2 px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white rounded-2xl transition-colors duration-150 bg-blue-600 border border-transparent active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
          Cancel
        </button>
        <button
          type="submit"
          className="block w-1-2 px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white rounded-2xl transition-colors duration-150 bg-blue-600 border border-transparent active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
        >
          Confirm
        </button>
      </form>
    </div>
  );
}

export default NewTraining;
