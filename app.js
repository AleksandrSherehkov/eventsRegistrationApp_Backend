const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const tasksRouter = require('./routes/api/tasks');
const EventsRouter = require('./routes/api/events');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/tasks', tasksRouter);
app.use('/api/events', EventsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).json({ message });
});

module.exports = app;