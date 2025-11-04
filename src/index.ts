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
} from "./controllers/blog.ts";
import { verifyToken } from "./middlewares/verifyToken.ts";
import { validateBlogOwnership } from "./middlewares/VerifyOwnership.ts";
import { validateBlogDetails } from "./middlewares/validateBlogDetails.ts";
import jwt from "jsonwebtoken";

const app = express();

dotenv.config();
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

app.post("/auth/login", login);
app.post("/auth/logout", logout);

//task endpoint
app.post("/blog", verifyToken, validateBlogDetails, createTask);
app.get("/blogs", verifyToken, getAllBlogs);
app.get("/blogs/:id", verifyToken, getBlogById);

app.patch("/blogs/:id", verifyToken, validateBlogOwnership, updateBlog);

///below we use app.patch as we are moving the blog to trash not actually deleting it from the database(soft delete) and one can restore it later by isDeleted:false
app.patch("/blogs/trash/:id", verifyToken, validateBlogOwnership, deleteBlog);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`App is live at:http://localhost:${PORT}`);
});
