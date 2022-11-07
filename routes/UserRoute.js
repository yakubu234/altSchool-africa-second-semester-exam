const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');
const JwtMiddleware = require('../app/middleware/Jwt');
const RegisterValidator = require("../app/requests/RegisterValidator");
const LoginValidator = require("../app/requests/LoginValidator");

router.post('/register', RegisterValidator.register, userController.create);
router.post('/login', LoginValidator.login, userController.login);
router.post('/sign-out', JwtMiddleware, userController.login);
module.exports = router;