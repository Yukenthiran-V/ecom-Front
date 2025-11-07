import userReducer, { loginRequest, loginSuccess } from "./userSlice";

console.log("loginRequest action:", loginRequest());
console.log(
  "loginSuccess action:",
  loginSuccess({ id: 123, name: "Bob" })
);

console.log(
  "userReducer test:",
  userReducer(undefined, loginRequest())
);
