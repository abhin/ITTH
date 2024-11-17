import { configureStore } from "@reduxjs/toolkit";
import ToDo from "./Slice/toDoSlice";
import User from "./Slice/userSlice";
import Auth from "./Slice/authSlice";

export default configureStore({
  reducer: { ToDo, User, Auth },
});
