import { body } from 'express-validator';
import { categoryExist } from '../helpers/db-validators.js';
import { validarCampos } from './validate-fields.js';
import { handleErrors } from './handle-errors.js';
import { validateJWT } from './validate-jwt.js';

export const getCategoryValidator = [
    validateJWT,
    validarCampos,
    handleErrors
]

export const createCategoryValidator = [
    validateJWT,
    body("name").notEmpty().withMessage('El nombre es requerido'),
    body("name").custom(categoryExist),
    validarCampos,
    handleErrors
]

export const updateCategoryValidator = [
    validateJWT,
    body("name").custom(categoryExist),
    validarCampos,
    handleErrors
]

export const deleteCategoryValidator = [
    validateJWT,
    validarCampos,
    handleErrors
]