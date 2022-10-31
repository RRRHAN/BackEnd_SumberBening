const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');

const router = express.Router();

router.post('/login', auth.basic, validate(authValidation.login), authController.login);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *             example:
 *               email: username1
 *               password: password1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                  accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIxMjMiLCJpYXQiOjE2NjcxODg4NTUsImV4cCI6NjE2NjcxODg3OTV9.6mnuCqiOpnbNkIxYbt67OZ7MDjHeWjn-yv3SkVIzRiY
 *               message: Success login
 *               statusCode: 200
 *       "400 Invalid Username":
 *         description: Invalid username
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 400
 *               message: Invalid username
 *       "400 Invalid Password":
 *         description: Invalid password
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 400
 *               message: Invalid password
 */
