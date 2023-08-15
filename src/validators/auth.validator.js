import { check } from "express-validator";
import validationError from "../errors/validation.error";

const validateLogin = [
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

const validatePassword = [
    check("new_password").exists()
                .not()
                .isEmpty()
                .isString(),
    (request, response, next) => {
        validationError.validateResult(request, response, next)
    }
];

module.exports = {
    validateLogin,
    validatePassword
}