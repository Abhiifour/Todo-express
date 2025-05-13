"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodos = getTodos;
exports.addTodo = addTodo;
exports.deleteTodo = deleteTodo;
exports.editTodo = editTodo;
exports.getATodo = getATodo;
const prisma_1 = require("../../generated/prisma");
const prisma = new prisma_1.PrismaClient();
function getTodos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // console.log(req.params.id)
            const userId = req.params.id;
            const id = parseInt(userId);
            // console.log(userId)
            const todos = yield prisma.todo.findMany({
                where: {
                    userId: id
                }
            });
            return res.json({
                todos
            });
        }
        catch (error) {
            return res.json(error);
        }
    });
}
function addTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, description, userId } = req.body;
            yield prisma.todo.create({
                data: {
                    title: title,
                    description: description,
                    status: "PENDING",
                    userId: userId,
                }
            });
            return res.json({
                message: "task added"
            });
        }
        catch (error) {
            return res.json(error);
        }
    });
}
function deleteTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.body.id;
            yield prisma.todo.delete({
                where: {
                    id: id
                }
            });
            return res.json({
                message: 'user deleted'
            });
        }
        catch (error) {
            return res.json(error);
        }
    });
}
function editTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.body.id;
            yield prisma.todo.update({
                where: {
                    id: id
                },
                data: {
                    status: 'COMPLETED'
                }
            });
            return res.json({
                message: 'edit sucessful'
            });
        }
        catch (error) {
            return res.json(error);
        }
    });
}
function getATodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const todoId = parseInt(id);
            const todo = yield prisma.todo.findFirst({
                where: {
                    id: todoId
                }
            });
            return res.json(todo);
        }
        catch (error) {
            return res.json(error);
        }
    });
}
