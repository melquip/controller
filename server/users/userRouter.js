const express = require('express');
const Users = require('./userDb');

const router = express.Router();

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

router.get('/', (req, res, next) => {
  Users.get().then(users => {
    res.status(200).json(users);
  }).catch(next);
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  Users.getUserPosts(req.user.id).then(posts => {
    res.status(200).json(posts);
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
  Users.getById(id).then(user => {
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
