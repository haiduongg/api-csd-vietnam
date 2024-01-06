const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
var bodyParser = require('body-parser');
const dotenv = require('dotenv');
const blogRoute = require('./routes/blog');
const authorRoute = require('./routes/author');

const port = 8000;
const app = express();

dotenv.config();

//CONNECT DATABASE
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: {
      w: 'majority',
      j: true,
      wtimeout: 1000,
    },
  })
  .then(() => {
    console.log('Connected to MongoDB');
  });

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.use(morgan('common'));

//ROUTES
app.use('/api/v1/blog', blogRoute);
app.use('/api/v1/author', authorRoute);

app.listen(port, () => {
  console.log(`Server is running in http://localhost:${port}`);
});
