import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import projectRouter from './routes/projectRoutes.js';
const app = express();
const port = 3002; // Use 3002 for debug
const corsOptions = {
    origin: process.env.TRUSTED_ORIGINS?.split(',') || [],
    credentials: true,
};
app.use(cors(corsOptions));
// app.all(/^\/api\/auth\/.*/, toNodeHandler(auth))
app.use(express.json({ limit: "50mb" }));
app.get("/", (req, res) => {
    res.send("Server is Live!");
});
app.use("/api/user", userRouter);
app.use("/api/project", projectRouter);
app.get("/api/test", (req, res) => {
    res.json({ ok: true });
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
