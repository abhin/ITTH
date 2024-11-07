import express from "express";
import { isLoggedIn } from "../middlewares/auth.js";
import {
  create,
  getAllTodos,
  update,
  deleteTodo,
} from "../controllers/todo.js";
import { body } from "express-validator";
import { getResult } from "../middlewares/validator.js";

const router = express.Router();

router.post(
  "/todos/create",
  isLoggedIn,
  body("title").exists().trim().isLength({ min: 3 }),
  getResult,
  create
);
router.get("/todos/read", isLoggedIn, getAllTodos);
router.put("/todos/update", isLoggedIn, update);
router.get("/todos/delete/:_id", isLoggedIn, deleteTodo);

export default router;
