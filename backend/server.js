
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/equipment', require('./routes/equipmentroute'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Serve the React build (frontend/build) from this same server/port
const path = require('path');
const fs = require('fs');
const buildPath = path.join(__dirname, '..', 'frontend', 'build');
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
  // Any non-API route returns index.html so React Router can handle it
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

// Export the app object for testing
if (require.main === module) {
    connectDB();
    // If the file is run directly, start the server
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }

module.exports = app
