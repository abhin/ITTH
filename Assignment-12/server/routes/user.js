import express from "express";
import {
  create,
  getAllUsers,
  update,
  deleteUser,
  login,
  activate,
} from "../controllers/user.js";
import { body } from "express-validator";
import { getValidationResult } from "../middlewares/validator.js";

const router = express.Router();

router.post(
  "/users/signup",
  body("name").exists().trim().notEmpty().isLength({min:3}).withMessage("Name should be Minimum 3 characters"),
  body("email").exists().trim().isEmail().withMessage("Invalid Email"),
  body("password")
    .trim()
    .exists()
    .isLength({min:5})
    .withMessage("Password should be Minimum 5 characters"),
    getValidationResult,
  create
);
router.post(
  "/users/create",
  body("password")
  .exists()
    .trim()
    .withMessage("Invalid password"),
    getValidationResult,
  create
);
router.post(
  "/users/login",
  body("email").exists().trim().isEmail().withMessage("Invalid Credentials"),
  body("password").exists().trim().notEmpty().withMessage("Invalid Credentials"),
  getValidationResult,
  login
);
router.get("/users/read", getAllUsers);
router.put("/users/update", update);
router.get("/users/delete/:_id", deleteUser);
router.get("/users/activate/:token", activate);

export default router;
