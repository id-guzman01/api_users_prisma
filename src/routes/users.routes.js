import { Router } from "express";
import { method as userController } from "../controller/users.controller";
import userValidator from "../validators/user.validator"
import userMiddleware from "../middleware/user.middleware"

const router = Router();

router.get("/",userController.getUsers);
router.get("/:id",userController.getUser);
router.post("/",userValidator.validateCreate,userController.addUser);
router.put("/:id",userValidator.validateCreate,userController.updateUser);
router.delete("/:id",userController.deleteUser);

export default router;