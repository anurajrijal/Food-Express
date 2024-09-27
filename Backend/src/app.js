import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import passport from './config/passport.js'
const app= express()

app.use((cors({
    origin:process.env.CORS_ORIGIN,
    Credentials:true
})))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(passport.initialize())
//routes
import userRouter from './routes/user.routes.js';

//routes declaration
app.use("/api/v1/users", userRouter)


export {app}