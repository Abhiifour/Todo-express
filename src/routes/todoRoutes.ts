import { Router } from "express";
import { addTodo, deleteTodo, editTodo, getATodo, getTodos } from "../controllers/todoController";
import verifyUser from "../middlewares/auth";

const todoRouter = Router()


todoRouter.get('/all/:id',verifyUser,getTodos)
todoRouter.post('/',verifyUser,addTodo)
todoRouter.post('/delete',verifyUser,deleteTodo)
todoRouter.post('/edit',verifyUser,editTodo)
todoRouter.get('/:id',verifyUser,getATodo)

export default todoRouter;