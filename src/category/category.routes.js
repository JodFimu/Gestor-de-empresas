import { createCategory, updateCategory, deleteCategory, getCategory } from './category.controller.js';
import { createCategoryValidator, updateCategoryValidator, deleteCategoryValidator, getCategoryValidator } from '../middlewares/category-validators.js';
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Endpoints relacionados con categorías
 */

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Obtiene una lista de categorías
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         description: Número de categorías a obtener
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *         description: Número de categorías a saltar
 *     responses:
 *       200:
 *         description: Categorías encontradas
 *       400:
 *         description: Error al obtener categorías
 */
router.get("/", getCategoryValidator, getCategory);

/**
 * @swagger
 * /category/createCategory:
 *   post:
 *     summary: Crea una nueva categoría
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: El nombre de la categoría
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *       400:
 *         description: Error al crear categoría
 */
router.post("/createCategory", createCategoryValidator, createCategory);

/**
 * @swagger
 * /category/updateCategory/{cid}:
 *   patch:
 *     summary: Actualiza una categoría existente
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: El nuevo nombre de la categoría
 *     responses:
 *       200:
 *         description: Categoría actualizada
 *       500:
 *         description: Error al actualizar la categoría
 */
router.patch("/updateCategory/:cid", updateCategoryValidator, updateCategory);

/**
 * @swagger
 * /category/deleteCategory/{cid}:
 *   delete:
 *     summary: Elimina una categoría existente
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría a eliminar
 *     responses:
 *       200:
 *         description: Categoría eliminada
 *       500:
 *         description: Error al eliminar la categoría
 */
router.delete("/deleteCategory/:cid", deleteCategoryValidator, deleteCategory);

export default router;