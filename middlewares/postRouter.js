const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router
.route('/')
.get(postController.findAll)
.post(postController.create);

router
.route('/:id')
.get(postController.findById);

module.exports = router;