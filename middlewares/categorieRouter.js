const express = require('express');
const categorieController = require('../controllers/categorieController');

const router = express.Router();

router
.route('/')
.get(categorieController.findAll)
.post(categorieController.create);

module.exports = router;