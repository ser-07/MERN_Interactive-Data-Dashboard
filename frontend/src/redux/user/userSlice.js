import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //Set loading to true at start
    signInStart: (state) => {
      state.isLoading = true;
    },

    //set data to currentuser, loading as false and no error
    signInSuccess: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.error = null;
    },

    //set error message when sign in failed
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    //Set error to null after timeout
    signInErrorTimeout: (state) => {
      state.error = null;
    },

    // Sign out reducers:

    signOutUserStart: (state) => {
      state.isLoading = true;
    },

    signOutUserSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.isLoading = false;
    },

    signOuUserFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

//export action so that we can dispatch them from UI
export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signInErrorTimeout,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} = userSlice.actions;

// export default counterSlice.reducer
export default userSlice.reducer;
