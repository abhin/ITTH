import express from "express";
import { create, getAllUsers, update, deleteUser } from "../controllers/user.js";

const router = express.Router();

router.post('/users/create', create);
router.get('/users/read', getAllUsers);
router.put('/users/update', update);
router.get('/users/delete/:_id', deleteUser);

export default router;
