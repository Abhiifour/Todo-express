"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todoController_1 = require("../controllers/todoController");
const auth_1 = __importDefault(require("../middlewares/auth"));
const todoRouter = (0, express_1.Router)();
todoRouter.get('/all/:id', auth_1.default, todoController_1.getTodos);
todoRouter.post('/', auth_1.default, todoController_1.addTodo);
todoRouter.post('/delete', auth_1.default, todoController_1.deleteTodo);
todoRouter.post('/edit', auth_1.default, todoController_1.editTodo);
todoRouter.get('/:id', auth_1.default, todoController_1.getATodo);
exports.default = todoRouter;
