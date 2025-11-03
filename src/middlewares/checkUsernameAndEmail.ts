import express,{type Request, type Response, type NextFunction} from 'express';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();



export async function checkUserNameAndEmail(req:Request, res:Response, next:NextFunction){
    try {
         const{  emailAddress, userName,  }=req.body;
        const UserEmail = await client.user.findUnique({
            where:{emailAddress}
         })
         if(UserEmail){
            res.status(400).json({message:"Email Address already exists"})
            return;
         }
         const UserWithName = await client.user.findUnique({
            where:{userName}
         })
         if(UserWithName){
            res.status(400).json({message:"Username already exists"})
            return;
         }

    } catch (error) {
        res.status(500).json({message:"Something went wrong"})

    }
    next();

}