import { login, googleLogin } from "../controllers/auth.js";
import express from "express";
import { getValidationResult } from "../middlewares/validator.js";
import { body } from "express-validator";
import passport from "passport";

const router = express.Router();

router.post(
  "/login",
  body("email").exists().trim().isEmail().withMessage("Invalid Credentials"),
  body("password")
    .exists()
    .trim()
    .notEmpty()
    .withMessage("Invalid Credentials"),
  getValidationResult,
  login
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  googleLogin
);

export default router;
