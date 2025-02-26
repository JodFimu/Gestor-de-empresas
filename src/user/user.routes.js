import {Router} from "express"
import { updatePassword } from "./user.controller.js";
import { updatePasswordValidator } from "../middlewares/user-validators.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Endpoints relacionados con usuarios
 */

/**
 * @swagger
 * /user/updatePassword:
 *   patch:
 *     summary: Actualiza la contraseña del usuario
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: La nueva contraseña del usuario
 *     responses:
 *       200:
 *         description: Contraseña actualizada
 *       400:
 *         description: La nueva contraseña no puede ser igual a la anterior
 *       500:
 *         description: Error al actualizar contraseña
 */
router.patch("/updatePassword", updatePasswordValidator, updatePassword)

export default router;