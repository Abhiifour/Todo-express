import express, { Request, Response } from 'express'
import todoRouter from './routes/todoRoutes'
import userRouter from './routes/userRoutes'
import rateLimit from 'express-rate-limit'

const app = express()

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, 
    limit: 100, 
    standardHeaders: 'draft-8',
    legacyHeaders: false, 
    message:"You have exhausted the api quota for 5 minutes"

})

app.use(express.json())
app.use(limiter)

app.use('/todo',todoRouter)
app.use('/user',userRouter)
app.get('/ping',(req:Request,res:Response) => {
    res.json({
        message:"healthy"
    })
})

app.listen(3000, () => {
    console.log('server running fine')
})