import { type Request, type Response, type NextFunction } from "express";

export function validateBlogDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { blogTitle, blogSynopsis, featuredImageUrl, blogContent } = req.body;

  // Trim values to avoid issues like "    "
  const title = blogTitle?.trim();
  const synopsis = blogSynopsis?.trim();
  const imageUrl = featuredImageUrl?.trim();
  const content = blogContent?.trim();

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }
  if (!synopsis) {
    return res.status(400).json({ message: "Synopsis is required" });
  }
  if (!imageUrl) {
    return res.status(400).json({ message: "Featured image URL is required" });
  }
  if (!content) {
    return res.status(400).json({ message: "Blog content is required" });
  }

  // Replace trimmed values so you store clean data in the DB
  req.body.blogTitle = title;
  req.body.blogSynopsis = synopsis;
  req.body.featuredImageUrl = imageUrl;
  req.body.blogContent = content;

  return next();
}
