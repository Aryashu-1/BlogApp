import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let navigate = useNavigate();
  let [err,setErr] = useState('')

  async function registerSubmit(newUser) {
    console.log(newUser);
    let res;
    if(newUser.userType === 'User'){
    //make http post request
    res = await axios.post("http://localhost:4000/user-api/user", newUser);
    }
    else if(newUser.userType === 'Author'){
       res = await axios.post("http://localhost:4000/author-api/author", newUser);

    }
   
    console.log(res);
    if (res.data.message === "user created successfully" || res.data.message === "author created successfully") {
      //navigate to login compoenent
      navigate('/SignIn')
    }
    else{
      setErr(res.data.message)
    }
  }
  return (
    <div className="m-6 text-white">
      <div className=" border-black rounded-md my-4 border-2 w-96 m-auto ">
        <h1 className="text-3xl font-semibold m-3 mx-4">Create Account</h1>

          {/** display signup error message */}
          {err.length !==0 && <p className="text-red">{err}</p>}
        <form
          className="px-10"
          onSubmit={handleSubmit(registerSubmit, () => {
            console.log("error");
          })}
        >
          <div className="my-4">
            <input
              type="radio"
              id="User"
              value="User"
              {...register("userType", { required: true })}
            />
            <label htmlFor="User" className="m-3">
              User
            </label>
            <input
              type="radio"
              id="Author"
              value="Author"
              {...register("userType", { required: true })}
            />
            <label htmlFor="Author" className="m-3">
              Author
            </label>
            {errors.userType && (
              <h3 className="px-1 text-sm text-red-600">
                ! Select your User type
              </h3>
            )}
          </div>

          <div className="my-4">
            <h1 className="font-semibold">Your userName</h1>
            <input
              placeholder="First and last userName"
              className="w-full  shadow-sky-600 shadow-md border-gray-500 border-2  text-black p-1 rounded-sm"
              type=""
              {...register("userName", { required: true })}
            ></input>
            {errors.userName?.type === "required" && (
              <h3 className="px-1 text-sm  text-red-600">
                ! Enter your userName
              </h3>
            )}
          </div>

          <div className="my-4">
            <h1 className="font-semibold ">email</h1>
            <input
              className="w-full border-gray-500 border-2 shadow-sky-600 shadow-md text-black p-1 rounded-sm"
              type="email"
              {...register("email", { required: true, minLength: 8 })}
            ></input>
            {errors.email?.type === "required" && (
              <h3 className="px-1 text-sm  text-red-600">! Enter your email</h3>
            )}
          </div>
          <div className="my-4">
            <h1 className="font-semibold m-2">Password</h1>
            <input
              id="password"
              className="w-full border-gray-500 border-2 s shadow-sky-600 shadow-md text-black p-1 rounded-sm"
              type="password"
              {...register("password", { required: true, minLength: 8 })}
            ></input>
            {errors.password?.type === "required" && (
              <h3 className="px-1 text-sm  text-red-600">
                ! Enter your password
              </h3>
            )}
            {errors.password?.type === "minLength" && (
              <h3 className="px-1 text-sm  text-red-600">
                Password must be atleat 8 cahracters
              </h3>
            )}
          </div>

          <div>
            <p className="my-10">
              To verify your number, we will send you a text message with a
              temporary code. Message and data rates may apply.
            </p>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className=" bg-gray-600 text-lg rounded-xl p-3 text-white hover:bg-sky-600     "
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center text-lg py-3">
          Already Registered !
          <NavLink
            to="/login"
            className="underline px-3 text-sky-500 font-semibold text-lg"
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Signup;
