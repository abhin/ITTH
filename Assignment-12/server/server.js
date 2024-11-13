import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import todoRouters from "./routes/todo.js";
import userRouters from "./routes/user.js";
import authRouters from "./routes/auth.js";
import { PORT, URL } from "./utilities/constants.js";
import passport from "passport";
import { googleStrategy } from "./middlewares/auth.js";

dotenv.config();

const server = express();
server.use(bodyParser.json());
passport.use(googleStrategy());
server.use(cors({ orgin: "http://localhost:5173" }));
server.use(`${URL}/auth`, authRouters);
server.use(`${URL}/todos`, todoRouters);
server.use(`${URL}/users`, userRouters);

server.get(`${URL}/healthcheck`, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server health is good",
  });
});

mongoose
  .connect(process.env.DB_URL)
  .then((data) => {
    server.listen(PORT, () => {
      console.log(`DB connected & Server is running...Port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection error", err);
  });
