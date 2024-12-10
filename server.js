import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/dbConnection.js";
import Router from "./routes/indexRoutes.js";
// import cors from "cors";

dotenv.config();

const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:5173", // Allow frontend origin
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded data (if needed)
app.use(express.urlencoded({ extended: true }));

// Server Connection
connectDB();

// Router Connection
app.use("/api/v1", Router);

// Static file serving (if needed)
// import path from "path";
// import { fileURLToPath } from "url";
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Server Start
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
