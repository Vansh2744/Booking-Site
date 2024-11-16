import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

export const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

//Routes
import userRouter from "./routes/User.routes.js";
import bookingRouter from "./routes/Booking.routes.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/booking", bookingRouter);
