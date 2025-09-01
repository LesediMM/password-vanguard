require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db'); // 1. Import the database connection function

// 2. Connect to the database before starting the server
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running silently on http://localhost:${PORT}`);
});
