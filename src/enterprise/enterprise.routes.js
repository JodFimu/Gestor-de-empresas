import {Router} from "express";

import { createEnterprise } from "./enterprise.controller.js";
import { addEnterpriseValidators } from "../middlewares/enterprise-validators.js"

const router = Router();

router.post("/addEnterprise", addEnterpriseValidators, createEnterprise)

export default router;