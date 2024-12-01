import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { auth, signInWithGithub, signInWithGoogle } from "../firebase.js";
import Cookies from "js-cookie";
import { useAuthState } from "react-firebase-hooks/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [Data, setData] = useState(initialState);
  const { password, email } = Data;
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      toast.error("Email is required!");
      return;
    }
    if (password === "") {
      toast.error("Password is required!");
      return;
    }

    try {
      // Example using fetch; you could also use axios
      const response = await fetch("http://localhost:3000/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        Cookies.set("jwt", data.token, { expires: 1 / 24 }); // 1 hour
        toast.success("Login successful!");
        // Save token or user data to local storage, if needed
        console.log("Hit the navigate here")
        navigate("/");// Adjust to your route
      } else {
        toast.error(data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      toast.error("An unexpected error occurred!");
    }
  };

  // useEffect(() => {
  //   if (loading) {
  //     return;
  //   }
  //   if (user) {
  //     navigate("/");
  //   }
  // }, [user, loading, navigate]);

  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="flex items-center justify-between text-purple-500 font-bold mt-5 p-1">
        <Link to={"/register"}>
          <div className="cursor-pointer flex items-center text-xs">
            <MdArrowBackIos />
            Back to register
          </div>
        </Link>
        {/* <div className="cursor-pointer text-xs">Need any help?</div> */}
      </div>

      <h1 className="text-2xl text-gray-800 text-center font-medium mt-5 p-2">
        Login
      </h1>
      <p className="text-gray-500 leading-5 text-center mb-2">
        Sign-in to continue
      </p>
      {error && <div className="my-4 text-center"> {error.message} </div>}
      <form
        onSubmit={handlesubmit}
        className="flex flex-col justify-center items-center"
      >
        <label className="relative">
          <input
            type="text"
            name="email"
            value={email}
            id="email"
            onChange={handleChange}
            className="my-2 mx-1 w-[270px] h-[30] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] px-6 py-3 rounded-full outline-none border-[1px] border-gray-400 focus:border-purple-500 transition duration-200"
          />
          <span className="absolute top-5 text-gray-500 left-0 mx-6 px-2 transition duration-300 input-text">
            {email ? "" : "Email"}
          </span>
        </label>
        <label className="relative">
          <input
            type="password"
            name="password"
            value={password}
            id="password"
            onChange={handleChange}
            className="my-2 mx-1 w-[270px] h-[30] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] px-6 py-3 rounded-full outline-none border-[1px] border-gray-400 focus:border-purple-500 transition duration-200"
          />
          <span className="absolute w-[80px] top-5 text-gray-500 left-0 mx-6 px-2 transition duration-300 input-text">
            {password ? "" : "Password"}
          </span>
        </label>
        <button
          type="submit"
          className="w-[270px] h-[30] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] p-2 md:p-0  bg-purple-700 text-white text-base font-medium md:font-semibold rounded-full mt-5 md:mt-4"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
      <div className="flex items-center justify-center mt-5 text-gray-500">
        <div className="border-[1px] w-[200px] border-gray-300 mr-1" />
        OR
        <div className="border-[1px] w-[200px] border-gray-300 ml-1"></div>
      </div>
      <div className="flex flex-col items-center">
        {/* <button
          type="submit"
          className="w-[270px] h-[30] sm:w-[360px] sm:h-[40px] md:w-[450px] md:h-[50px] p-2 md:p-0 bg-gray-100 text-black text-base font-medium rounded-full mt-5 md:mt-4 flex items-center justify-center"
          onClick={() => signInWithGoogle()}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/2991/2991148.png"
            alt="google"
            className="h-[25px] md:h-[28px] mr-[6px]"
          />
          Login with Google
        </button> */}
        {/* <button
          type="submit"
          className="w-[270px] h-[30] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] p-2 md:p-0 bg-white border-gray-200 border-[2px] text-base font-medium rounded-full my-5 md:mt-4 flex items-center justify-center"
          onClick={() => signInWithGithub()}
        >
          <img
            src={require("../assets/Github.png")}
            alt="facebook"
            className="h-[30px] sm:h-[36px] mr-[2px]"
          />
          Login with Github
        </button> */}
        <div className="text-gray-600 mt-2 mb-5">
          Don't have an account?{" "}
          <Link to={"/register"}>
            <span className="text-purple-500 font-medium">Register here</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
