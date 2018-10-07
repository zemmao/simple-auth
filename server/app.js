'use strict';

require('express-async-errors');
const auth = require('./common/auth');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const HttpStatus = require('http-status');
const jsend = require('jsend').middleware;
const origin = require('./common/origin');
const router = require('./router');

const { INTERNAL_SERVER_ERROR, NOT_FOUND } = HttpStatus;

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(auth.initialize());
app.use(origin());
app.use(jsend);

app.use(process.env.SERVER_ENDPOINT, router);
app.use((req, res) => res.status(NOT_FOUND).end());

app.use((err, req, res) => {
  let { status, message } = err;

  if (!status) status = INTERNAL_SERVER_ERROR;
  if (!message) {
    res.status(status).end();
  } else {
    res.status(status).jsend.error(message);
  }

  console.error(err);
});

module.exports = app;
