import { type Request, type Response } from "express";
import { PrismaClient } from "@prisma/client";
// import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const userProf = await client.user.findUnique({
      where: { id: userId },
      select: {
        ///if there is no auto complete of the field sit means that the import path used is incorrect or the prisma client is not generated
        firstName: true,
        lastName: true,
        userName: true,
        emailAddress: true,
      },
    });
    //validation
    if (!userProf) {
      res.status(404).json({ message: "User Not found" });
      return;
    }

    res.status(200).json({ userProf });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id; //from verifyToken middleware
    const { firstName, lastName, userName, emailAddress } = req.body;
    const profUpdate = await client.user.update({
      where: { id: String(userId) },
      data: {
        firstName,
        lastName,
        userName,
        emailAddress,
      },
      select: {
        firstName: true,
        lastName: true,
        userName: true,
        emailAddress: true,
      },
    });
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const getUserBlog = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const blogs = await client.blog.findMany({
      where: {
        AND: [{ userId: userId }, { isDeleted: false }],
      },
      select: {
        id: true,                 //  ✅ return ID
        blogTitle: true,
        blogSynopsis: true,
        featuredImageUrl: true,
        createdAt: true,
      },
    });

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "No blog found for this user" });
    }

    res.status(200).json({
      message: "User blogs retrieved successfully",
      blogs,
    });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};


///GET USERS TRASH
export const getUserTrash = async (req:Request,res:Response) =>{
  try {
    const userId = req.user.id;

    const deletedBlogs = await client.blog.findMany({
      where:{
        AND:[{userId : userId}, {isDeleted:true}]
      },
      select:{
        id:true,
        blogTitle:true,
        blogSynopsis:true,
        featuredImageUrl:true,
        createdAt:true,
      }
    });

    res.status(200).json({ blogs: deletedBlogs });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

