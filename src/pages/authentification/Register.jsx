import axios from "axios";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "../../components/form/Input";
import { useLoading } from "../../hooks/useLoading";

export default function Register() {
  const { isLoading, startLoading, stopLoading } = useLoading(false);

  const {
    handleSubmit,
    control,
    formState: { isValid },
    watch,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      birthday: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const password = watch("password");
  const onSubmit = async (data) => {
    startLoading();
    try {
      await axios
        .post("http://localhost:3000/spacetune/api/register", {
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
      console.log(err, "erreur => signInWithEmailAndPassword");
    }
  };
  return (
    <div className="h-screen flex bg-gradient-to-tr from-black to-gray-800">
      <div className="flex w-1/2 justify-around items-center">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">SpaceTune</h1>
          <p className="text-white mt-1">
            {" "}
            The most popular platform music in the world
          </p>
          <button
            type="submit"
            className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
          >
            Read More
          </button>
        </div>
      </div>
      <div className="flex w-1/2 justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-1/2 p-12 bg-white rounded-2xl"
        >
          <div className="flex justify-center"></div>
          <h1 className="mb-4 text-2xl font-bold text-center">Register</h1>
          <Controller
            name="username"
            control={control}
            rules={{
              required: `Please enter your username.`,
            }}
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                {...field}
                label="Username"
                placeholder="username"
                hasError={invalid}
                error={error && error.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{
              required: `Please enter your email.`,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email",
              },
            }}
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                {...field}
                label="Email"
                placeholder="enter your email address"
                hasError={invalid}
                error={error && error.message}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            rules={{
              pattern: {
                value: /^[0-9]{8}$/i,
                message: "Invalid phone number",
              },
            }}
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                {...field}
                icon="(+216)"
                label="Phone"
                type="text"
                placeholder="phone number"
                hasError={invalid}
                error={error && error.message}
              />
            )}
          />
          <Controller
            name="birthday"
            control={control}
            rules={{
              required: `Please enter your birthday.`,
            }}
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                {...field}
                label="Birthday"
                type="date"
                placeholder="birthday"
                hasError={invalid}
                error={error && error.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Please enter your passwword",
              minLength: { value: 6, message: "min length 6 characters" },
            }}
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                {...field}
                label="Password"
                type="password"
                placeholder="password"
                hasError={invalid}
                error={error && error.message}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: "Confirm password is required",
              minLength: 6,
              validate: (confirmPassword) => confirmPassword === password,
            }}
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                {...field}
                label="Confirm password"
                type="password"
                placeholder="confirm your password"
                hasError={invalid}
                error={error && error.message}
              />
            )}
          />

          <button
            type="submit"
            className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white rounded-2xl transition-colors duration-150 bg-blue-600 border border-transparent active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
            href="#"
          >
            Sign up
          </button>
          <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
            Forgot Password ?
          </span>
          <div>
            {" "}
            <span className="text-sm ml-2 text-blue-500 hover:text-black font-semibold cursor-pointer">
              You have an account ?
            </span>
            <span className="text-sm ml-2 text-dark font-semibold cursor-pointer">
              Login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
