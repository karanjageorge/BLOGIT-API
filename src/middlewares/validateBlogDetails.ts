import {
  type Request,
  type Response,
  type NextFunction,
  response,
} from "express";

export function validateBlogDetails(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { blogTitle, blogSynopsis, featuredImageUrl, blogContent } = req.body;
  if (!blogTitle) {
    res.status(400).json({ message: "Title is required" });
    return;
  }
  if (!blogSynopsis) {
    res.status(400).json({ message: "Synopsis is required" });
    return;
  }
  if (!featuredImageUrl) {
    res.status(400).json({ message: "Featured image url required" });
    return;
  }
  if (!blogContent) {
    res.status(400).json({ message: "Blog content required" });
    return;
  }
  next();
}
