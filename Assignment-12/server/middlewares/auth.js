import jwt from "jsonwebtoken";

export function isLoggedIn(req, res, next) {
  const token = req.headers.authorization;

  try {
    if (!token) throw new Error("Invalid access token");

    const data = jwt.verify(token, process?.env?.JWT_KEY);
    req.authUser = data;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}
