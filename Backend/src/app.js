import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from './config/passport.js';

const app = express();

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL,  // 'http://localhost:5173' from your .env file
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-xsrf-token', 'X-Requested-With', 'Accept'] // Updated allowedHeaders
}));

// Handle preflight requests
app.options('*', cors());

// Body parsers with increased limit
app.use(express.json({ limit: "50mb" })); // Updated limit to 50MB
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Static files, cookies, and passport initialization
app.use(express.static("public"));
app.use(cookieParser());
app.use(passport.initialize());

// Routes
import userRouter from './routes/user.routes.js';
import foodRouter from './routes/food.routes.js';
app.use("/api/v1/users", userRouter);
app.use("/api/v1/food", foodRouter);

export { app };
