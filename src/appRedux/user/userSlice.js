import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
    };

    const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            state.isLoading = false;
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
        },
    },
    })


//     // test here:
// console.log("userSlice.actions:", userSlice.actions);
// console.log("loginRequest():", userSlice.actions.loginRequest());
// console.log(
//   "loginSuccess({ id: 1, name: 'Alice' }):",
//   userSlice.actions.loginSuccess({ id: 1, name: "Alice" })
// );

// const nextState = userSlice.reducer(undefined, userSlice.actions.loginRequest());
// console.log("nextState after loginRequest():", nextState);


export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    logout,
} = userSlice.actions;

export default userSlice.reducer;

