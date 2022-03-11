const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router
.route('/')
.get(userController.findAll)
.post(userController.create);

router
.route('/:id')
.get(userController.findById)
.put(userController.update);

module.exports = router;
