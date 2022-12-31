import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";

import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";
import commentRoute from "./routes/comments.js";

const app = express();
dotenv.config();

// Constants
const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then((res) => console.log("Connected to DB"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Listening port ${process.env.PORT}`);
});

// Middleware
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static("uploads"));

// Routes
app.get("/", (req, res) => {
  res.send("Server is already Connected");
});

// http://localhost:3002
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);
