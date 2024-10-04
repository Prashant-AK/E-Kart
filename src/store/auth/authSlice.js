import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authData: {},
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setVerifiedUserData: (state, action) => {
      state.authData = { ...state.authData, ...action.payload };
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setVerifiedUserData, setUserData } = authSlice.actions;
export default authSlice.reducer;
