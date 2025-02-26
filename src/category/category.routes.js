import { createCategory, updateCategory, deleteCategory, getCategory } from './category.controller.js';
import { createCategoryValidator, updateCategoryValidator, deleteCategoryValidator, getCategoryValidator } from '../middlewares/category-validators.js';
import { Router } from 'express';

const router = Router();

router.get("/", getCategoryValidator, getCategory);

router.post("/createCategory", createCategoryValidator, createCategory);


router.patch("/updateCategory/:cid", updateCategoryValidator, updateCategory);


router.delete("/deleteCategory/:cid", deleteCategoryValidator, deleteCategory);

export default router;