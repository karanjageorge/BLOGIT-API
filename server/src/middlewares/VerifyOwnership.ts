import { PrismaClient } from "@prisma/client";
import { type Request, type Response, type NextFunction } from "express";

const client = new PrismaClient();

export const validateBlogOwnership = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.id;

    // Basic guards
    if (!id) {
      return res.status(400).json({ message: "Missing blog id" });
    }
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const blog = await client.blog.findFirst({
      where: {
        id: String(id),        // ensure string
        userId: String(userId) // ensure string
      },
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found or unauthorized" });
    }

    // Attach blog to request for downstream handlers if needed
    (req as any).blog = blog;

    return next();
  } catch (error) {
    console.error("validateBlogOwnership error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
