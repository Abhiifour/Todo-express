import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'


const key = process.env.TOKEN_KEY || ''


export default function verifyUser(req: Request, res: Response, next: NextFunction): any {
    const token = req.headers.authorization || '';

    try {
        const validToken = jwt.verify(token, key);

        if (!validToken) {
            return res.status(403).json({
                message: 'invalid access'
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid token'
        });
    }
}

