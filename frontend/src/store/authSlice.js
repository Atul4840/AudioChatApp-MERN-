import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from '@reduxjs/toolkit'

// export interface CounterState {
//   value: number
// }

const initialState = {
  //   value: 0,
  isAuth: false,
  user: null,
  otp: {
    phone: "",
    hash: "",
  },
  //   const isAuth = false;
  //   const user = {
  //   activated: true,
  //   }
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const {user} = action.payload;
      state.user = user;

      if(user===null){
        state.isAuth = false;
      }else{
        state.isAuth = true;
      }
      

    },
    setOtp: (state, action) => {
        const {phone,hash} = action.payload;
        state.otp.phone = phone;
        state.otp.hash = hash; 
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth ,setOtp} = authSlice.actions;

export default authSlice.reducer;
