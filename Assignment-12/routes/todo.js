import express from "express";
import {isLoggedIn} from "../middlewares/auth.js";
import { create, getAllTodos, update, deleteTodo } from "../controllers/todo.js";

const router = express.Router();

router.post('/todos/create', isLoggedIn, create);
router.get('/todos/read', isLoggedIn, getAllTodos);
router.put('/todos/update', isLoggedIn, update);
router.get('/todos/delete/:_id', isLoggedIn, deleteTodo);

export default router;
