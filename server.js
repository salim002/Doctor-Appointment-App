import express from "express";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectToMongo from "./config/db.js";
import routes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

// import cors from "cors";

dotenv.config();

// Rest Object
const app = express();
const PORT = process.env.PORT || 8080;

connectToMongo();

// Middlewares
app.use(express.json());
// app.use(cors())
app.use(morgan('dev'));

// Routes
app.use("/api/v1/user", routes);
app.use("/api/v1/admin", adminRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`.bgCyan.white);
})