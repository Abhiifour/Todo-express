import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "../../generated/prisma";


const prisma = new PrismaClient()
const key = process.env.TOKEN_KEY || ''

export async function login(req:Request, res:Response):Promise<any>{

    try {
        const {username, password} = req.body;

        const user =  await prisma.user.findFirst({
            where:{
                username:username,
                password:password
            }
        })
        if(!user){
            return res.status(404).json({
                message:'user not found'
            })
        }

        const token = jwt.sign({username},key)

        return res.status(200).json({
            token,
            user
        })
 
    } catch (error) {
        return res.status(500).json(error)
    }

}

export async function signup(req:Request, res:Response):Promise<any>{
    try {
        const {username,password}  = req.body;

        const user = await prisma.user.findFirst({
            where:{
                username:username
            }
        })

        if(!user){
            await prisma.user.create({
                data:{
                    username:username,
                    password:password,
                }
            })

            return res.json({
                message:'user created'
            })
        }

        return res.json({
            message:'username exists'
        })
       

    } catch (error) {
        return res.json(error)
    }
}

export async function deleteUser(req: Request, res: Response): Promise<any> {
    try {
        const { id } = req.body;

        const user = await prisma.user.findUnique({
            where: { id: id }
        });

        if (!user) {
            return res.json({
                message: 'user not found'
            });
        }

        await prisma.user.delete({
            where: { id: id }
        });

        return res.json({
            message: 'user deleted'
        });
    } catch (error) {
        return res.json(error);
    }
}