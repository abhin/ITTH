import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import routers from "./routers.js";

dotenv.config();

const PORT = 8000;
const VERSION = 'v1';

const server = express();
server.use(bodyParser.json());
server.use(`/api/${VERSION}`, routers);
server.get("/api/healthcheck", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server health is good",
  });
});

mongoose
  .connect(process.env.DB_URL)
  .then((data) => {
    server.listen(PORT, () => {
      console.log("DB connected & Server is running...");
    });
  })
  .catch((err) => {
    console.log("Database connection error", err);
  });
