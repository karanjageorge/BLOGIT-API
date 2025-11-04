//here all controllers with have the business logics of dealing with blogs
import { type Request, type Response } from "express";
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

///1.CREATING BLOGS
export const createTask = async (req: Request, res: Response) => {
  try {
    const { blogTitle, blogSynopsis, featuredImageUrl, blogContent } = req.body;
    // console.log(req.user.id);
    // res.send("Creating Task")
    await client.blog.create({
      data: {
        blogTitle,
        blogSynopsis,
        featuredImageUrl,
        blogContent,
        userId: req.user.id,
      },
    });
    res.status(201).json({ message: "Blog created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

///2.GETTING ALL BLOGS
export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    // res.send("Getting all blogs")
    const blogs = await client.blog.findMany({
      where: {
        AND: [{ userId: userId }, { isDeleted: false }],
      },
    });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

///3.GETTING A SINGLE BLOG BY ID
export const getBlogById = async (req: Request, res: Response) => {
  try {
    // console.log(req.params)
    // res.send("Getting blog by id")
    const { id } = req.params;
    const userId = req.user.id;
    const blog = await client.blog.findFirst({
      where: {
        AND: [{ id: String(id) }, { userId }, { isDeleted: false }],
      },
    });

    //validation of the blog
    if (!blog) {
      res.status(404).json({ message: "Blog unavailable" });
      return;
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { blogTitle, blogSynopsis, featuredImageUrl, blogContent } = req.body;

    //updating allowed field
    await client.blog.update({
      where: { id: String(id) },
      data: {
        blogTitle,
        blogSynopsis,
        featuredImageUrl,
        blogContent,
      },
    });
    res.status(200).json({ message: "Blog updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

///MOVING BLOG TO TRASH
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    ///.client.blog.update does soft deletion unlike .client.blog.delete which does hard delete
    await client.blog.update({
      where: { id: String(id) },
      data: { isDeleted: true },
    });
    res.status(200).json({ message: "Blog moved to trash successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
