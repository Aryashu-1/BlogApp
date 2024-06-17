import { configureStore } from "@reduxjs/toolkit";
import userauthorreducer from "./slices/userauthorslice";
export const store = configureStore({
    reducer :{
        userauthorloginreducer : userauthorreducer
    }
})