const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const userRouter = require('./users/userRouter');

const server = express();

const appAssets = path.resolve('./client/build');
const appBuild = path.resolve('./client/build/index.html');

server.use(helmet());
server.use(logger);

server.use(express.static(appAssets));

server.use(express.json());
server.use(cors());

server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.sendFile(appBuild);
});

function logger(req, res, next) {
  console.log(req.method, req.url, Date.now())
  next();
};

module.exports = server;
