import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, emailAddress, userName, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await client.user.create({
      data: {
        firstName,
        lastName,
        emailAddress,
        userName,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: "Account created successfully" }); //when creating something on the server the status code should be 201
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const login = async function (req: Request, res: Response) {
  try {
    //1.get identifier and password
    const { identifier, password } = req.body;

    //2.get user whose username or email matches the identifier
    const user = await client.user.findFirst({
      where: {
        OR: [{ emailAddress: identifier }, { userName: identifier }],
      },
    });

    //3.if we don't find a user - wrong credentials
    if (!user) {
      res.status(400).json({ message: "Wrong credentials" });
      return;
    }

    //4.if we find a user,compare the user password with given password
    const passwordMatch = await bcrypt.compare(password, user.password);

    //if password does not match
    if (!passwordMatch) {
      res.status(400).json({ message: "Wrong login Credentials" });
      return;
    }

    //  //if they match -- login success-- prepare payload and hide the sensitive info like passwords
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
      userName: user.userName,
    };
    //  res.send("logged in successfully")

    //generate a token and send it to the client as a cookie
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY!, {
      expiresIn: "14d",
    });

    res.status(200).cookie("authToken", token).json(payload);

    res.status(400).json({ message: "Logging in" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const logout = function (req: Request, res: Response) {
  try {
    res
      .status(200)
      .clearCookie("authToken")
      .json({ message: "Logged out successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
