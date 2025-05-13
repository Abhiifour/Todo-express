import { Request, Response } from "express";

import { PrismaClient } from "../../generated/prisma";


const prisma = new PrismaClient()

export async function getTodos(req:Request, res:Response) : Promise<any>{
    try {
        // console.log(req.params.id)
        const userId = req.params.id as string;
        const id = parseInt(userId)
        // console.log(userId)
        const todos = await prisma.todo.findMany({
            where:{
                userId:id
            }
        })
        return res.json({
            todos
        })
    } catch (error) {
        return res.json(error)
    }
}

export async function addTodo(req:Request, res:Response): Promise<any>{
    try {

        const {title, description, userId} = req.body;
        await prisma.todo.create({
            data:{
                title:title,
                description:description,
                status:"PENDING",
                userId:userId,

            }
        })

        return res.json({
            message:"task added"
        })
    } catch (error) {
        return res.json(error)
    }
}

export async function deleteTodo(req:Request, res:Response): Promise<any>{

    try {
        const id = req.body.id;
        await prisma.todo.delete({
            where:{
                id:id
            }
        })
        return res.json({
            message:'user deleted'
        })
    } catch (error) {
        return res.json(error)      
    }
}

export async function editTodo(req:Request, res:Response): Promise<any>{
    try {
        const id = req.body.id;
        await prisma.todo.update({
            where:{
                id:id
            },
            data:{
                status:'COMPLETED'
            }
        })
        return res.json({
            message:'edit sucessful'
        })
    } catch (error) {
        return res.json(error)
    }
}

export async function getATodo(req:Request, res:Response): Promise<any>{
    try {
        const id = req.params.id;
        const todoId = parseInt(id)
        const todo = await  prisma.todo.findFirst({
            where:{
                id:todoId
            }
        })

        return res.json(todo)
    } catch (error) {
        return res.json(error)
    }
}