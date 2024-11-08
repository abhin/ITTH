import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"
import bodyParser from "body-parser";
import todoRouters from "./routes/todo.js";
import userRouters from "./routes/user.js";
import { PORT, URL } from "./utilities/constants.js";


dotenv.config();

const server = express();
server.use(bodyParser.json());
server.use(cors({ orgin: "http://localhost:5173"}));
server.use(URL, todoRouters);
server.use(URL, userRouters);

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
