import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { register, login, logout } from "./controllers/auth.ts"; //uses the imported control from the auth.ts
import { checkDetails } from "./middlewares/checkDetails.ts";
import { checkUserNameAndEmail } from "./middlewares/checkUsernameAndEmail.ts";
import { checkPasswordStrength } from "./middlewares/CheckPassword.ts";
import {
  createTask,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  restoreFromBin,
  eraseBlog,
} from "./controllers/blog.ts";
import { getUserProfile, updateUserProfile,getUserBlog,getUserTrash} from "./controllers/users.ts";
import { verifyToken } from "./middlewares/verifyToken.ts";
import { validateBlogOwnership } from "./middlewares/VerifyOwnership.ts";
import { validateBlogDetails } from "./middlewares/validateBlogDetails.ts";
import jwt from "jsonwebtoken";

import cors from "cors";///add cors middleware to allow cross origin requests
const app = express();

dotenv.config();

app.use(cors({ //configure cors middleware
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json()); //middleware responsible for making express understand the req body
app.use(cookieParser()); //middleware to enable js to read the cookies
app.get("/", (_req, res) => {
  res.status(200).send("<h1>Welcome to BlogIt</h1>");
}); //we prefix the req with an underscore as we are not using it

app.post(
  "/auth/register",
  checkDetails,
  checkUserNameAndEmail,
  checkPasswordStrength,

  register,
);

///Routes
app.post("/auth/login", login);
app.post("/auth/logout", logout);

//blog  endpoint
app.post("/blogs", verifyToken, validateBlogDetails, createTask);
app.get("/blogs", verifyToken, getAllBlogs);
app.get("/blogs/:id", verifyToken, getBlogById);

app.patch("/blogs/:id", verifyToken, validateBlogOwnership, updateBlog);
app.patch(
  "/blogs/restore/:id",
  verifyToken,
  validateBlogOwnership,
  restoreFromBin,
);
///below we use app.patch as we are moving the blog to trash not actually deleting it from the database(soft delete) and one can restore it later by isDeleted:false
app.patch("/blogs/trash/:id", verifyToken, validateBlogOwnership, deleteBlog);

app.delete("/blogs/:id", verifyToken, validateBlogOwnership, eraseBlog);

///USER PROFILES
app.get("/profile", verifyToken, getUserProfile);
app.patch("/profile", verifyToken, checkUserNameAndEmail, updateUserProfile);
app.get("/profile/blogs", verifyToken, getUserBlog);
app.get("/profile/trash", verifyToken, getUserTrash);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`App is live at:http://localhost:${PORT}`);
});



