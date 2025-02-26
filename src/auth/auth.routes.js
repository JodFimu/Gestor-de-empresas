import { Router } from "express";
import { login } from "./auth.controller.js";
import { loginValidator } from "../middlewares/user-validators.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints relacionados con autenticación
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión en la aplicación
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: El correo electrónico del usuario
 *               username:
 *                 type: string
 *                 description: El nombre de usuario del usuario
 *               password:
 *                 type: string
 *                 description: La contraseña del usuario
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Crendenciales inválidas
 *       500:
 *         description: login failed, server error
 */
router.post("/login", loginValidator, login);

export default router;