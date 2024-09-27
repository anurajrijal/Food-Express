import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from './config/passport.js';

const app = express();

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL,  // Make sure this is set to 'http://localhost:5173' in your .env file
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Add this line to handle preflight requests
app.options('*', cors());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(passport.initialize());

// Routes
import userRouter from './routes/user.routes.js';
app.use("/api/v1/users", userRouter);

export { app };