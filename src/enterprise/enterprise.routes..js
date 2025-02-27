import {Router} from "router";

import { createEnterprise } from "./enterprise.controller.js";

const router = Router();

router.post("/addEnterprise", createEnterprise)

export default router;