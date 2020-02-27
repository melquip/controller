const express = require('express');
const Users = require('../models/user');
const Locals = require('../models/locals');
const Sensors = require('../models/sensors');

const router = express.Router();

router.get('/', (req, res, next) => {
  Users.get().then(users => {
    res.status(200).json(users);
  }).catch(next);
});

router.get('/:id', validateUserId, async (req, res) => {
  const { user } = req;
  try {
    let currentAddress = 8;
    let currentLocal = 0;
    let currentSensor = 0;
        
    const formatSensorField = (value) => {
      currentAddress += 2;
      return {
        "address": currentAddress.toString(),
        "value": value >= 0 ? `+${value}` : `-${value}`,
      }
    }

    const allLocals = await Locals.find({ userId: user.id });
    const allSensors = await Sensors.findIn("localId", allLocals.map(l => l.id));
    user.locals = allLocals.map(local => {
      const relevantSensors = allSensors.filter(s => s.localId === local.id);
      return {
        ...local,
        "number": (++currentLocal).toString(),
        "totalSensors": relevantSensors.length.toString(),
        "sensors": relevantSensors.map(sensor => ({
          ...sensor,
          "number": (++currentSensor).toString(),
          "type": formatSensorField(sensor.type),
          "dayMin": formatSensorField(sensor.dayMin),
          "dayMax": formatSensorField(sensor.dayMax),
          "nightMin": formatSensorField(sensor.nightMin),
          "nightMax": formatSensorField(sensor.nightMax),
          "dayHour": formatSensorField(sensor.dayHour),
          "dayMinute": formatSensorField(sensor.dayMinute),
          "nightHour": formatSensorField(sensor.nightHour),
          "nightMinute": formatSensorField(sensor.nightMinute),
          "pinInput": formatSensorField(sensor.pinInput),
          "pinOutput": formatSensorField(sensor.pinOutput),
          "pinOutputInverted": formatSensorField(sensor.pinOutputInverted),
        }))
      };
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error)
  }
});

router.post('/', validateUser, (req, res, next) => {
  Users.insert({
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }).then(user => {
    res.status(200).json(user);
  }).catch(next);
});

router.delete('/:id', validateUserId, (req, res, next) => {
  Users.delete(req.user.id).then(deleted => {
    res.status(200).json(req.user);
  }).catch(next);
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  const { name } = req.body;
  Users.update(req.user.id, { name }).then(updated => {
    res.status(200).json({ ...req.user, name });
  }).catch(next);
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  Users.findOne({ id }).then(user => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({ message: "invalid user id" });
    }
  }).catch(next);
};

function validateUser(req, res, next) {
  if (Object.keys(req.body).length) {
    const { name, email, password } = req.body;
    if (name) {
      next();
    } else {
      res.status(400).json({ message: "missing required name field" });
    }
  } else {
    res.status(400).json({ message: "missing user data" });
  }
};

function validatePost(req, res, next) {
  if (Object.keys(req.body).length) {
    const { text } = req.body;
    if (text) {
      next();
    } else {
      res.status(400).json({ message: "missing required text field" });
    }
  } else {
    res.status(400).json({ message: "missing post data" });
  }
};

router.use((error, req, res, next) => {
  res.status(500).json({
    file: 'userRouter',
    method: req.method,
    url: req.url,
    message: error.message
  });
});

module.exports = router;
