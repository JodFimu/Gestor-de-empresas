import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "../middlewares/validate-jwt.js"

import {enterpriseExist} from "../helpers/db-validators.js"

export const addEnterpriseValidators = [
    validateJWT,
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("name").custom(enterpriseExist),
    body("description").notEmpty().withMessage("La descripcion es requerida"),
    body("rate").isFloat({ min: 0, max: 5}),
    body("category").isMongoId().withMessage("No es una categoria valida"),
    body("fundationYear").notEmpty().withMessage("El año de fundacion es requerido"),
    body("fundationYear").isInt().withMessage("Se require un numero entero"),
    validarCampos,
    handleErrors
]

export const updateEnterpriseValidators = [
    validateJWT,
    param("eid").isMongoId().withMessage("No es un id valido"),
    body("name").custom(enterpriseExist),
    body("rate").optional().isFloat({ min: 0, max: 5}),
    body("category").optional().isMongoId().withMessage("No es una categoria valida"),
    body("fundationYear").optional().isInt().withMessage("Se require un numero entero"),
    validarCampos,
    handleErrors
]