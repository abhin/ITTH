import { configureStore } from "@reduxjs/toolkit";
import ToDo from "./Slice/ToDo";
import User from "./Slice/User";
import Auth from "./Slice/Auth";

export default configureStore({
  reducer: { ToDo, User, Auth },
});
