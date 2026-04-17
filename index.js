import express from "express";
import dotenv from "dotenv";
// import cors from "cors";
import cookieParser from "cookie-parser";

// import { connectDB } from "./db/connectDB.js";

import authroutes from "./routes/auth.route.js";
import loanRoutes from "./routes/loan.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3030;

//2:55:34
//app.use(cors({ origin: "http://localhost:5173", credentials: true })); //replace with your frontend url

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies


app.use("/api/v1/auth", authroutes)
app.use("/api/v1/loans", loanRoutes)

app.listen(PORT, () => {
    // connectDB();
  console.log(`server running on port ${PORT}`);
});