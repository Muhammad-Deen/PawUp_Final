import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/auth.js"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Routes
// app.use("/api", chatRoutes); // now POST to /api/chat
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
