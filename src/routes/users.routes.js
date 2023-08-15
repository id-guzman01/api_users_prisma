import { Router } from "express";
import { method as userController } from "../controller/users.controller";
import userValidator from "../validators/user.validator";
import authMiddleware from "../middleware/auth.middleware"

const router = Router();

router.get("/",
        authMiddleware.roleAdmin,
        authMiddleware.isLogged,
        userController.getUsers);
router.get("/:id",
        authMiddleware.roleClient,
        authMiddleware.isLogged,
        userController.getUser);
router.post("/",
        userValidator.validateCreate,
        userController.addUser);
router.put("/updateRole/:id",
        authMiddleware.roleAdmin,
        authMiddleware.isLogged,
        userValidator.validateRole,
        userController.updateRole);
router.put("/:id",
        authMiddleware.roleAdmin,
        authMiddleware.isLogged,
        userValidator.validateUpdate,
        userController.updateUser);
router.delete("/:id",
        authMiddleware.roleAdmin,
        authMiddleware.isLogged,
        userController.deleteUser);

export default router;