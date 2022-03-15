const express = require('express');
const userController = require('../controllers/userController');
const auth = require('./auth');

const router = express.Router();

router
.route('/')
.get(auth, userController.findAll)
.post(userController.create);

router
.route('/me')
.delete(auth, userController.destroy);

router
.route('/:id')
.get(auth, userController.findById);

module.exports = router;
