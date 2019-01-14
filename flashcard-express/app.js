"use strict";

const log4js = require('log4js');
const dotenv = require('dotenv-extended');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const questionnaireDispatcher = require('./controller/questionnaire');

const logger = log4js.getLogger('server');
log4js.configure('log4js.json');

// Read the properties from file '.env' and '.env.defaults'.
// silent: true - no log message is shown when missing the .env or .env.defaults files.
dotenv.load({ silent: true });
const PORT = process.env.PORT || 9090;

// Initialize Mongo
mongoose.Promise = global.Promise;
const url = `mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}`;
mongoose.connect(url, { useNewUrlParser: true });

// Initialize express and middlewares
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Dispatchers
app.use('/flashcard-express', questionnaireDispatcher);

app.get('/', (req, res) => {
  const logger = log4js.getLogger('app');
  logger.debug("Successfully processed %s request for '%s'", req.method, req.url);
  res.send(200);
});

app.listen(PORT);

// Put a friendly message on the terminal
logger.info(`Server running on ${PORT}`);
