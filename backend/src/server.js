import express from "express";
import "dotenv/config"; // Load environment variables from .env file
import cors from "cors"; // Import CORS middleware
import cookieParser from "cookie-parser"; // Import cookie-parser middleware
import authRouter from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import chatRouter from "./routes/chatRoutes.js";

const app = express(); // Initialize an express app
const PORT = process.env.PORT || 3000; // Define the port

await connectDB(); // Connect to MongoDB

// Middleware Setup
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Allow requests from the client URL
    credentials: true, // Allow cookies to be sent with requests
  }),
);
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Cookie parser middleware to parse http cookies

// Define API routes
app.use("/api/auth", authRouter); // Use auth routes
app.use("/api/user", userRouter); // Use user routes
app.use("/api/chat", chatRouter); // Use chat routes

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
