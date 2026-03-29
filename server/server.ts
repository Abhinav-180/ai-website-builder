import 'dotenv/config'
import app from './app.js';

console.log('✓ All imports loaded successfully');

// Error handling to prevent silent crashes
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`✓ Server is running at http://localhost:${port}`)
  console.log('✓ Server initialization complete!');
});
