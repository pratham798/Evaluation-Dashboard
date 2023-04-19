import express from "express";
import connectDB from "./connect.js";
import * as dotenv from "dotenv";
import router from "./routes/index.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());
connectDB(process.env.MONGO_DB_URL);

app.use("/api", router);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
