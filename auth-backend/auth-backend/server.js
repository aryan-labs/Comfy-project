import express from "express";
import { ConnectDb } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import cors from "cors";
import "dotenv/config";
const app = express();

const port = 4000;
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", Credential: true }));

ConnectDb();
app.get("/", (req, res) => {
  res.send("api working");
});
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`server star${port}`);
});
