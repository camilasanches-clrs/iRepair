import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config"
import authRoutes from "./routes/auth.routes";
import { authenticateToken } from "./middlewares/auth.Middleware";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoutes);




app.get("/profile", authenticateToken, (req, res) => {
  res.json({ message: "Você está autenticado!", user: req.user });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
