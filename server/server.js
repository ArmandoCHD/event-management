const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB database connection established successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

const authRouter = require('./routes/authRoutes');
const eventsRouter = require('./routes/events');
const categoriesRouter = require('./routes/categories');
const usersRouter = require('./routes/users');

app.use('/auth', authRouter);
app.use('/events', eventsRouter);
app.use('/categories', categoriesRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
