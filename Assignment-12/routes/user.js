import express from "express";
import { create, getAllUsers, update, deleteUser, login, activate } from "../controllers/user.js";

const router = express.Router();

router.post('/users/signup', create);
router.post('/users/create', create);
router.post('/users/login', login);
router.get('/users/read', getAllUsers);
router.put('/users/update', update);
router.get('/users/delete/:_id', deleteUser);
router.get('/users/activate/:token', activate);

export default router;
