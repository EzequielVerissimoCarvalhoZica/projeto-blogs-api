const express = require('express');
const auth = require('./auth');
const categorieController = require('../controllers/categorieController');

const router = express.Router();

router
.route('/')
.get(categorieController.findAll)
.post(auth, categorieController.create);

module.exports = router;