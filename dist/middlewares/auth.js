"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = verifyUser;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const key = process.env.TOKEN_KEY || '';
function verifyUser(req, res, next) {
    const token = req.headers.authorization || '';
    try {
        const validToken = jsonwebtoken_1.default.verify(token, key);
        if (!validToken) {
            return res.status(403).json({
                message: 'invalid access'
            });
        }
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: 'Invalid token'
        });
    }
}
