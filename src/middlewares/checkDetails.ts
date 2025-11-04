import { type Request, type Response, type NextFunction } from "express";
export function checkDetails(req: Request, res: Response, next: NextFunction) {
  const { firstName, lastName, emailAddress, userName, password } = req.body;
  // console.log('middleware hit')
  //field validation
  if (!firstName) {
    res.status(400).json({ message: "first name required" });
    return;
  }
  if (!lastName) {
    res.status(400).json({ message: "last name required" });
    return;
  }
  if (!emailAddress) {
    res.status(400).json({ message: "Email required" });
    return;
  }
  if (!userName) {
    res.status(400).json({ message: "Username required" });
    return;
  }
  if (!password) {
    res.status(400).json({ message: "Password required" });
    return;
  }
  next();
}
