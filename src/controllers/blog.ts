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
    // const userId = req.user.id;

    const blogs = await client.blog.findMany({
      where: { isDeleted: false },
      select: {
        //using select to select which fields we want to use
        id: true, ///by adding true we are telling prisma to include the field in the results i.e the id field
        blogTitle: true,
        blogSynopsis: true,
        featuredImageUrl: true,
        createdAt: true,
        user: {
          select: {
            ///this is a nested select
            firstName: true,
            lastName: true,
          },
        },
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
    // this is known as object destructuring(js feature that allows u to pull out properties from an object easily).This helps write cleaner and shorter codes especially where there are multiple parameters i.e if the route two parameters : const {userId, blogId} = req.params; would extract both at once instead of writing : const user = req.params.userId; const blogId = req.params.blogId;

    //one can also write it as const id = req.params.id; ---- both extract the value of id from the req.params object and store it in a variable called id
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
      data: {
        isDeleted: true,
      },
    });
    res.status(200).json({ message: "Blog moved to trash successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

///RESTORE FROM BIN
export const restoreFromBin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await client.blog.update({
      where: { id: String(id) },
      data: {
        isDeleted: false,
      },
    });
    res.status(200).json({ message: "Blog restored successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

//PERMANENTLY DELETING A blog
export const eraseBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await client.blog.delete({
      where: { id: String(id) },
    });
    res.status(200).json({ message: "Blog Permanently deleted" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
