import express from "express";
import {
  signup,
  login,
  logout,
  onboard,
} from "../controllers/authController.js";
import { authUser } from "../middlewares/authMiddleware.js";

const authRouter = express.Router(); // Create a router for auth routes

// Define the signup,login and logout routes
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

authRouter.post("/onboarding", authUser, onboard);
authRouter.get("/me", authUser, (req, res) => {
  res.status(200).json({ user: req.user });
});

export default authRouter; // Export the auth router for use in server.js
