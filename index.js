const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
var bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const blogRoute = require('./routes/blog');
const authorRoute = require('./routes/author');
const { startPingJob } = require('./ultils/pingApi');

const port = 8000;
const app = express();

dotenv.config();

//CONNECT DATABASE
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};
connectDB();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.use(morgan('common'));

//ROUTES
app.use('/api/v1/blog', blogRoute);
app.use('/api/v1/author', authorRoute);

//Ping api server only 10 minutes
startPingJob();

app.listen(port, () => {
  console.log(`Server is running in http://localhost:${port}`);
});
