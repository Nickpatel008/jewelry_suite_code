const express = require('express');
const { login, register } = require('../../controllers/authController');
const validator = require("../../helper/validator");
const { jois } = require('./schema');
const router = express.Router();

// Define the route
router.post('/register', validator(jois.registrationPayload), register);
router.post('/login', validator(jois.loginPayload), login);

module.exports = router;
