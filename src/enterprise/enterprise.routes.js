import {Router} from "express";

import { createEnterprise, updateEnterprise} from "./enterprise.controller.js";
import { addEnterpriseValidators , updateEnterpriseValidators} from "../middlewares/enterprise-validators.js"

const router = Router();

router.post("/addEnterprise", addEnterpriseValidators, createEnterprise);
router.put("/updateEnterprise/:eid", updateEnterpriseValidators, updateEnterprise);

export default router;