import { Router } from "express";
import {method as authController} from "../controller/auth.controller"
import authValidator from "../validators/auth.validator"
import authMiddleware from "../middleware/auth.middleware"

const router = Router();

router.post("/",
            authMiddleware.validateExistsToken,
            authValidator.validateLogin,
            authController.login);
router.post("/changuePassword/:id",
            authMiddleware.isLogged,
            authValidator.validatePassword,
            authController.changuePassword);

export default router;