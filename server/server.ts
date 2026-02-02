import express, { Request, Response } from 'express';
import 'dotenv/config'
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.js';
import userRouter from './routes/userRoutes.js';
import projectRouter from './routes/projectRoutes.js';

console.log('✓ All imports loaded successfully');

// Error handling to prevent silent crashes
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

async function startServer() {
  try {
    const app = express();

    const port = 3001;
    const corsOptions = {
      origin: process.env.TRUSTED_ORIGINS?.split(',') || [],
      credentials: true,
    }

    console.log('✓ CORS options configured:', corsOptions);

    app.use(cors(corsOptions))

    console.log('✓ CORS middleware added');

    app.all(/^\/api\/auth\/.*/, toNodeHandler(auth))

    console.log('✓ Better-auth handler registered');

    app.use(express.json({ limit: "50mb" }))

    console.log('✓ JSON middleware added');

    app.get("/", (req: Request, res: Response) => {
      res.send("Server is Live!")
    })

    app.use("/api/user", userRouter)
    app.use("/api/project", projectRouter)

    console.log('✓ All routes registered');

    app.get("/api/test", (req, res) => {
      res.json({ ok: true });
    });

    console.log('✓ Error handlers registered');

    const server = app.listen(port, () => {
      console.log(`✓ Server is running at http://localhost:${port}`)
      console.log('✓ Server initialization complete!');
    });

    // Keep the server alive
    server.on('close', () => {
      console.log('Server closed');
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer().catch((error) => {
  console.error('❌ Fatal error during server startup:', error);
  process.exit(1);
});
