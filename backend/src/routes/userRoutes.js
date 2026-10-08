import express from "express";
import { authUser } from "../middlewares/authMiddleware.js";
import {
  getMyFriends,
  getRecommendedUsers,
  sendFriendRequest,
  acceptFriendRequest,
  getFriendRequests,
  getOutgoingFriendRequests,
} from "../controllers/userController.js";

const userRouter = express.Router();

// Protect all routes below with auth middleware
userRouter.use(authUser);

userRouter.get("/", getRecommendedUsers);
userRouter.get("/friends", getMyFriends);
userRouter.post("/friend-requests/:id", sendFriendRequest);
userRouter.put("/friend-requests/:id/accept", acceptFriendRequest);
userRouter.get("/friend-requests", getFriendRequests);
userRouter.get("/friend-requests/outgoing", getOutgoingFriendRequests);

export default userRouter;
