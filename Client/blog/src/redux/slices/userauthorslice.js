import { createSlice,createAsyncThunk, isPending } from "@reduxjs/toolkit";
import axios from "axios";

//making http requests using redux-thunk middleware
export const userAuthorLoginThunk = createAsyncThunk("user-author-login",async(userCred,thunkApi )=>{
    try {
    if(userCred.userType === "User"){
     let res;
 
     res = await axios.post("https://localhost:4000/user-api/login", userCred);
 
       if( res.data.message === "Login Succesfull"){
             //store token in local storage
             localStorage.setItem("token",res.data.token)
             //return data
             
       }
       else{
            thunkApi.rejectWithValue(res.data.message)
       }
       return res.data
    }
    if(userCred.userType === "Author"){
        
            const res = await axios.post("https://localhost:4000/author-api/login",userCred)
        if( res.data.message === "Login Succesfull"){
            //store token in local storage
            localStorage.setItem("token",res.data.token)
            //return data

        }
        else{
             thunkApi.rejectWithValue(res.data.message)
        }
        return res.data
    }
}catch(err){
    return thunkApi.rejectWithValue(err)
}})


const userauthorslice = createSlice({
    name:"user-author-login",
    initialState:{
        "isPending" : false,
        "loginUserStatus": false,
        "currentUser":{},
        "errOccurred":false,
        "errMsg":'',
    },
    reducers:{
            resetState: (state,action)=>{
                state.isPending = false;
                state.currentUser ={};
                state.loginUserStatus = false;
                state.errMsg='';
                state.errOccurred = false;    

            }
    },
    extraReducers: builder => builder
    .addCase(userAuthorLoginThunk.pending,(state,action)=>{
        state.isPending = true;
    })
    .addCase(userAuthorLoginThunk.fulfilled,(state,action)=>{
        state.isPending = false;
        state.currentUser = action.payload.user;
        state.loginUserStatus = true;
        state.errMsg='';
        state.errOccurred=false;
    })
    .addCase(userAuthorLoginThunk.rejected,(state,action)=>{
        state.isPending = false;
        state.currentUser = {};
        state.loginUserStatus = false;
        state.errMsg=action.payload;
        state.errOccurred=true;
    }),
})

//export action creatorfunctions
export const {resetState}= userauthorslice.actions
//export root reducer f this slice
export default userauthorslice.reducer;
