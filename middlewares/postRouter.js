const express = require('express');
const postController = require('../controllers/postController');
const auth = require('./auth');

const router = express.Router();

router
.route('/')
.get(auth, postController.findAll)
.post(auth, postController.create);

router
.route('/search')
.get(auth, postController.findByQuery);

router
.route('/:id')
.get(auth, postController.findById)
.put(auth, postController.update)
.delete(auth, postController.destroy);

module.exports = router;