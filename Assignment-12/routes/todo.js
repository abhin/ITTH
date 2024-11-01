import express from "express";
import { create, getAllTodos, update, deleteTodo } from "../controllers/todo.js";

const router = express.Router();

router.post('/todos/create', create);
router.get('/todos/read', getAllTodos);
router.put('/todos/update', update);
router.get('/todos/delete/:_id', deleteTodo);

export default router;
