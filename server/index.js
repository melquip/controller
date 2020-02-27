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
server.use('/api/test', (req, res) => {
  res.json({
    "id": "4y7vad8tv7as8v6s7a8",
    "totalLocals": 1,
    "locals": [
      {
        "number": 1,
        "totalSensors": 1,
        "name": "Local1",
        "address": 11,
        "sensors": [
          {
            "number": 1,
            "name": "Sensor1deLocal1",
            "Tipo_Sensor": {
              "address": 13,
              "value": 1,
              "sign": "+/-"
            },
            "Dia_Min": {
              "address": 13,
              "value": 1,
              "sign": "+/-"
            },
            "Dia_Max": {
              "address": 13,
              "value": 1,
              "sign": "+/-"
            },
            "Noite_Max": {
              "address": 13,
              "value": 1,
              "sign": "+/-"
            },
            "Hora_Dia_Hora": {
              "address": 13,
              "value": 1,
              "sign": "+/-"
            },
            "Hora_Noite_Hora": {
              "address": 13,
              "value": 1,
              "sign": "+/-"
            },
            "Hora_Dia_Minuto": {
              "address": 13,
              "value": 1,
              "sign": "+/-"
            },
            "Hora_Noite_Minuto": {
              "address": 13,
              "value": 1,
              "sign": "+/-"
            },
            "Porta do Controlador Sensor": {
              "address": 13,
              "value": 1,
              "sign": "+/-"
            },
            "Porta do Controlador Rele": {
              "address": 13,
              "value": 1,
              "sign": "+/-"
            },
            "Saida Normal Ou Invertida": {
              "address": 13,
              "value": 1,
              "sign": "+/-"
            },
          }
        ]
      }
    ]
  })
});

server.get('/', (req, res) => {
  res.sendFile(appBuild);
});

function logger(req, res, next) {
  console.log(req.method, req.url, Date.now())
  next();
};

module.exports = server;
