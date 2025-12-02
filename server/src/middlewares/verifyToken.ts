///this middle ware will be reused almost everywhere where we want to basically to confirm who the user is i.e // res.send(`${req.user.firstName} wants to create a task`)
import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";

//the problem solved by the interface is to help
interface User {
  id: string;
  firstName: String;
  lastName: String;
  emailAddress: string;
  userName: String;
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const { authToken } = req.cookies;
  if (!authToken) {
    res.status(401).json({ message: "Unauthorized!! Please Login" });
    return;
  }

  try {
    //using jwt to verify the token thus the need to import the jwt module
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY!);
    req.user = decoded as User; ///decoded info stands for who the user is while (as user) is a command for typecasting
    next();
  } catch (error) {
    res.status(500).json({ message: "Unauthorized!! Please Login" });
  }
}
