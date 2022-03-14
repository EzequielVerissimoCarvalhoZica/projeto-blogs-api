const express = require('express');
const postController = require('../controllers/postController');
const auth = require('./auth');

const router = express.Router();

router
.route('/')
.get(auth, postController.findAll)
.post(auth, postController.create);

router
.route('/:id')
.get(postController.findById);

module.exports = router;