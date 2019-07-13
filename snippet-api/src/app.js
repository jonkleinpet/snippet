require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const usersRoute = require('./routes/users/usersRoute');
const snippetRoute = require('./routes/codeSnippets/codeSnippetsRoute');
const { NODE_ENV } = require('./config');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption, { skip: () => NODE_ENV === 'test' }));
app.use(helmet());
app.use(cors());

app.use('/api', usersRoute);
app.use('/api/snippets', snippetRoute);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
