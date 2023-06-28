import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    // Action creator for setting/loading the current user
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    // Action creator for setting an error message
    setError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    // Action creator for setting/loading the isLoading state
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    resetUser(state) {
      console.log("resetting user");
      state.currentUser = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setCurrentUser, setError, setLoading, resetUser } =
  userSlice.actions;
export default userSlice.reducer;
