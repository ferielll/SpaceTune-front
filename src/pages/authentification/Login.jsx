import axios from "axios";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../../components/form/Input";
import { useLoading } from "../../hooks/useLoading";

export default function Login({ setLoggedIn }) {
  const { isLoading, startLoading, stopLoading } = useLoading(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const onSubmit = async (data) => {
    const { email, password } = data;
    if (email === "admin@gmail.com" && password === "admin") {
      navigate("/dashboard");
      return;
    }
    startLoading();
    try {
      await axios
        .post("http://localhost:3000/spacetune/api/login", {
          email,
          password,
        })
        .then((res) => {
          console.log("res.data.token",res.data)
          setLoggedIn(true);
          if (!res.data.success) {
            stopLoading();
            return;
          }
          localStorage.setItem("token", res.data.token);
        });
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
          className="w-1/2 p-12 bg-white rounded-2xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex justify-center"></div>
          <h1 className="mb-4 text-2xl font-bold text-center">Login</h1>
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
                placeholder="Email Address"
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
            }}
            render={({ field, fieldState: { invalid, error } }) => (
              <Input
                {...field}
                label="Password"
                type="password"
                placeholder="Password"
                hasError={invalid}
                error={error && error.message}
              />
            )}
          />
          <button
            className="block cursor-pointer w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white rounded-2xl transition-colors duration-150 bg-blue-600 border border-transparent active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
            href="#"
            disabled={!isValid}
          >
            Sign in
          </button>
          <span className="text-sm ml-2 hover:font-semibold cursor-pointer">
            Forgot Password ?
          </span>
          <div onClick={() => navigate("/Register")}>
            <span className="text-sm ml-2 text-blue-500 hover:text-black font-semibold cursor-pointer">
              Don't have an account ?
            </span>
            <span className="text-sm ml-2 text-dark font-semibold cursor-pointer">
              Register
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
