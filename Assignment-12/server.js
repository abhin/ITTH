import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const PORT = 8000;
const server = express();

server.get("/api/healthcheck", (req, res) => {
  res.send({
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
