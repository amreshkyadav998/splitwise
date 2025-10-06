require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/splitwise';

async function start() {
  try {
    await mongoose.connect(mongoUri, { autoIndex: true });
    const server = http.createServer(app);
    server.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server listening on port ${port}`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();


