//these are the global declaration files that are not converted to js

//they tell typescript to grab request type from express and add user
//global declaration of the user object
import * as express from "express";

interface User {
  id: string;
  firstName: String;
  lastName: String;
  emailAddress: string;
  userName: String;
}
declare global {
  namespace Express {
    interface Request {
      //selecting the interface to be overridden
      user: User;
    }
  }
}
