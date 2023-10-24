const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes/index');
const { errorCatchMiddleware } = require('./middlewares/catchErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limiter');

// const { authMiddleware } = require('./middlewares/authMid');

const { PORT = 3000, NODE_ENV, DB_ADDRESS } = process.env;

mongoose.connect(NODE_ENV === 'production' ? DB_ADDRESS : 'mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
}).then(() => {
  console.log('connected to db');
});

const app = express();
app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(bodyParser.json());
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorCatchMiddleware);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
