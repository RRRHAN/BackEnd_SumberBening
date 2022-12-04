const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');

const router = express.Router();

router.post('/login', auth.basic, validate(authValidation.login), authController.login);

module.exports = router;
