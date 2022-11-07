const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');
router.get('blog/lists', userController.create);
router.post('blog/read/:id([0-9]+)', userController.authenticate);
router.post('blog/search', userController.authenticate);
module.exports = router;