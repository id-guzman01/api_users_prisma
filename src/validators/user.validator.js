import { check } from "express-validator";
import validationError from "../errors/validation.error";

const validateCreate = [
    check("name").exists()
                .not()
                .isEmpty()
                .isString(),
    check("documento").exists()
                .not()
                .isEmpty()
                .isString(),
    check("telefono").exists()
                .not()
                .isEmpty()
                .isString(),
    check("email").exists()
                .not()
                .isEmpty()
                .isEmail(),
    check("password").exists()
                .not()
                .isEmpty()
                .isString(),
    (request, response, next) => {
        validationError.validateResult(request, response, next)
    }
];

module.exports = {
    validateCreate
}