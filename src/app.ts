import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("API Running 🚀");
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

export default app;