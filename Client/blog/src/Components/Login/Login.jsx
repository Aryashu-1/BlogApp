import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import axios from "axios";
import {useDispatch} from 'react-redux'
import { userAuthorLoginThunk } from "../../redux/slices/userauthorslice";


function Login() {
    let [User,setUser] = useContext(UserContext)
    function Userlogin(User){
        setUser(User)
    }
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let navigate = useNavigate();

let dispatch = useDispatch()
  let [err,setErr] = useState('')

 function handleFormSubmit(User) {
    console.log("User logged in ");
    //console.log(User)
    dispatch(userAuthorLoginThunk(User))
    // let res;
    // if(User.userType === 'User'){
    //   res = await axios.post('http://localhost:4000/user-api/login',User)
    // }
    // else if(User.userType === 'Author'){
    //   res = await axios.post('http://localhost:4000/author-api/login',User)
    // }
    // if (res.data.message === "Login Succesfull"){
    // Userlogin(User)
    // // navigate('/Home')
    // }
    // else{
    //   setErr(res.data.message)
    //   console.log(res.data.message)
    // }
 }
  return (
    <div className="m-6 text-white">
      <a className="text-4xl p-4 m-auto">WELCOME BACK!!!! </a>
      <p className="p-6">
        If you do not have account{" "}
        <a href={"/signup"} className="underline">
          Click here
        </a>{" "}
        to Sign-Up{" "}
      </p>
      <div className="w-96 rounded-md m-auto border-black border-2">
        <h1 className=" mx-6 my-3 font-semibold text-2xl">SIGN IN</h1>

       

        <form className="px-10 m-2" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="my-4">
           <div className="text-white text-lg">
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
           <input
             type="radio"
             id="Admin"
             value="Admin"
             {...register("userType", { required: true })}
           />
           <label htmlFor="Admin" className="m-3">
             Admin
           </label>
           {errors.userType && (
             <h3 className="px-1 text-sm text-red-600">
               ! Select your User type
             </h3>
           )}
         </div>
         </div>
          <div className="py-3">
            {" "}
            <h1 className="text-xl font-semibold">username</h1>
            <input
              className=" w-full p-2 text-black rounded-md border-2 border-gray-500"
              type="text"
              {...register("username", { required: true })}
            ></input>
          </div>
          {errors.username?.type === "required" && (
            <h3 className=" text-red-700">*required</h3>
          )}
          <div className="py-3">
            <h1 className="text-xl font-semibold">Password</h1>
            <input
              id="password"
              className=" w-full text-black p-2 rounded-md border-2 border-gray-500"
              type="password"
              {...register("password", { required: true, minLength: 8 })}
            ></input>
            {errors.password?.type === "required" && (
              <h3 className=" text-red-700">*required</h3>
            )}
            {errors.password?.type === "minLength" && (
              <h3 className=" text-red-700">
                Password must be atleat 8 cahracters
              </h3>
            )}
          </div>
          <div className="text-center p-4">
            <button
              type="submit"
              className=" bg-gray-800 text-lg rounded-xl p-3 text-white hover:bg-blue-700 "
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="text-center text-lg py-3">
          Don't have an account ?
          <NavLink
            to="/signup"
            className="underline px-3 text-blue-700 font-semibold text-lg"
          >
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
