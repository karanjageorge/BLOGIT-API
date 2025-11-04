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
    const existingBlog = await client.blog.findFirst({
      where: {
        AND: [
          { id: String(id) },
          { userId: req.user.id },
          { isDeleted: false },
        ],
      },
    });
    //validation
    if (!existingBlog) {
      res.status(404).json({ message: "Blog not found" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
