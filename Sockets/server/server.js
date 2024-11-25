import express from "express";
import dotenv from "dotenv";

dotenv.config();

const server = express();

server.listen(8001, () => console.log('Server successfully connected Port:: 8001'));