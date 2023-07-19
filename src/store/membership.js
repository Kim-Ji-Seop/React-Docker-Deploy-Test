import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  agreements: null,
  uid: null,
  name: null,
  birthday: null,
  phone: null,
  password: null,
  email: null,
};

export const membershipSlice = createSlice({
  name: "membership",
  initialState: { value: initialStateValue },
  reducers: {
    SET_AGREEMENT: (state, action) => {
      state.value = action.payload;
    },
    SET_SIGNUP_PHONE: (state, action) => {
      state.value = action.payload;
    },
    SET_SIGNUP: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { SET_AGREEMENT, SET_SIGNUP_PHONE, SET_SIGNUP } =
  membershipSlice.actions;
export default membershipSlice.reducer;
