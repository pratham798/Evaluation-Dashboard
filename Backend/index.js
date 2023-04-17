import express from "express";
import connectDB from "./connect.js";
import * as dotenv from "dotenv";
import router from "./routes/index.js";

dotenv.config();

const app = express();
app.use(express.json({ limit: "50mb" }));
connectDB(process.env.MONGO_DB_URL);

app.use("/api", router);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
