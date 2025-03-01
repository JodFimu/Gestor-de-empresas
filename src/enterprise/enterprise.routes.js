import { Router } from "express";

import { createEnterprise, updateEnterprise, generateReport } from "./enterprise.controller.js";
import { addEnterpriseValidators, updateEnterpriseValidators, generateReportValidators } from "../middlewares/enterprise-validators.js"

const router = Router();

/**
 * @swagger
 * /addEnterprise:
 *   post:
 *     summary: Agregar una nueva empresa
 *     tags: [Empresa]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: El nombre de la empresa
 *                 example: "Empresa XYZ"
 *               description:
 *                 type: string
 *                 description: La descripción de la empresa
 *                 example: "Una empresa de tecnología"
 *               rate:
 *                 type: number
 *                 description: La calificación de la empresa
 *                 example: 4.5
 *               category:
 *                 type: string
 *                 description: El ID de la categoría de la empresa
 *                 example: "60d0fe4f5311236168a109ca"
 *               fundationYear:
 *                 type: number
 *                 description: El año de fundación de la empresa
 *                 example: 2000
 *     responses:
 *       200:
 *         description: Empresa agregada exitosamente
 *       500:
 *         description: Error al agregar la empresa
 */
router.post("/addEnterprise", addEnterpriseValidators, createEnterprise);

/**
 * @swagger
 * /updateEnterprise/{eid}:
 *   put:
 *     summary: Actualizar una empresa existente
 *     tags: [Empresa]
 *     parameters:
 *       - in: path
 *         name: eid
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID de la empresa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: El nombre de la empresa
 *                 example: "Empresa XYZ"
 *               description:
 *                 type: string
 *                 description: La descripción de la empresa
 *                 example: "Una empresa de tecnología"
 *               rate:
 *                 type: number
 *                 description: La calificación de la empresa
 *                 example: 4.5
 *               category:
 *                 type: string
 *                 description: El ID de la categoría de la empresa
 *                 example: "60d0fe4f5311236168a109ca"
 *               fundationYear:
 *                 type: number
 *                 description: El año de fundación de la empresa
 *                 example: 2000
 *     responses:
 *       200:
 *         description: Empresa actualizada exitosamente
 *       400:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error al actualizar la empresa
 */
router.put("/updateEnterprise/:eid", updateEnterpriseValidators, updateEnterprise);

/**
 * @swagger
 * /getEnterprises:
 *   get:
 *     summary: Generar un informe de empresas
 *     tags: [Empresa]
 *     parameters:
 *       - in: query
 *         name: minYears
 *         schema:
 *           type: integer
 *         description: Años mínimos de experiencia
 *       - in: query
 *         name: maxYears
 *         schema:
 *           type: integer
 *         description: Años máximos de experiencia
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: El ID de la categoría
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [az, za]
 *         description: Orden de clasificación
 *       - in: query
 *         name: minRate
 *         schema:
 *           type: number
 *         description: Calificación mínima
 *       - in: query
 *         name: maxRate
 *         schema:
 *           type: number
 *         description: Calificación máxima
 *     responses:
 *       200:
 *         description: Empresas filtradas exitosamente
 *       500:
 *         description: Error al filtrar empresas
 */
router.get("/getEnterprises", generateReportValidators, generateReport);

export default router;