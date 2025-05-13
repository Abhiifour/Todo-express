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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.signup = signup;
exports.deleteUser = deleteUser;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../../generated/prisma");
const prisma = new prisma_1.PrismaClient();
const key = process.env.TOKEN_KEY || '';
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const user = yield prisma.user.findFirst({
                where: {
                    username: username,
                    password: password
                }
            });
            if (!user) {
                return res.status(404).json({
                    message: 'user not found'
                });
            }
            const token = jsonwebtoken_1.default.sign({ username }, key);
            return res.status(200).json({
                token,
                user
            });
        }
        catch (error) {
            return res.status(500).json(error);
        }
    });
}
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const user = yield prisma.user.findFirst({
                where: {
                    username: username
                }
            });
            if (!user) {
                yield prisma.user.create({
                    data: {
                        username: username,
                        password: password,
                    }
                });
                return res.json({
                    message: 'user created'
                });
            }
            return res.json({
                message: 'username exists'
            });
        }
        catch (error) {
            return res.json(error);
        }
    });
}
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.body;
            const user = yield prisma.user.findUnique({
                where: { id: id }
            });
            if (!user) {
                return res.json({
                    message: 'user not found'
                });
            }
            yield prisma.user.delete({
                where: { id: id }
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
