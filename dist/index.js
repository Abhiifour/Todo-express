"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const app = (0, express_1.default)();
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 5 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: "You have exhausted the api quota for 5 minutes"
});
app.use(express_1.default.json());
app.use(limiter);
app.use('/todo', todoRoutes_1.default);
app.use('/user', userRoutes_1.default);
app.get('/ping', (req, res) => {
    res.json({
        message: "healthy"
    });
});
app.listen(3000, () => {
    console.log('server running fine');
});
