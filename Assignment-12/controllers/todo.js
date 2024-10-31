// import express from "express";
import {create} from "../modals/todo.js";

const router = {};

router.post("/create", create);

export default router;