const express = require('express');
const userController = require('../controllers/userController');
const auth = require('./auth');

const router = express.Router();

router
.route('/')
.get(auth, userController.findAll)
.post(userController.create);

router
.route('/:id')
.get(userController.findById)
.put(userController.update);

module.exports = router;
