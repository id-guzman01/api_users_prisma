import jwt from "jsonwebtoken";
import config from "../config";

const validateExistsToken = (request, response, next) => {
    let token = request.headers['x-access-token'] || request.headers['authorization'] || request.headers['Authorization'];
    if(!token){
        response.status(401).json({
            status: 401,
            message: "Bad request, acceso denegado, no cuenta con un token valido."
        });
    }else{
        if(token.startsWith('Bearer ')){
            token = token.slice(7, token.length);
        }
        jwt.verify(token, config.SECRET_KEY, (error, decoded) => {
            if(error){
                next();
            }else{
                response.status(401).json({
                    status: 401,
                    message: "Bad request, actualmente cuenta con un token valido"
                });
            }
        });
    }
};

const isLogged = async (request, response, next) => {
    let token = request.headers['x-access-token'] || request.headers['authorization'] || request.headers['Authorization'];
    if(!token){
        response.status(401).json({
            status: 401,
            message: "Bad request, acceso denegado, no cuenta con un token valido."
        });
    }else{
        if(token.startsWith('Bearer ')){
            token = token.slice(7, token.length);
        }
        jwt.verify(token, config.SECRET_KEY, (error, decoded) => {
            if(error){
                response.status(401).json({
                    status: 401,
                    message: "Bad request, token erroneo o ya expiró"
                });
            }else{
                next();
            }
        });
    }
};

const roleAdmin = async (request, response, next) => {
    let token = request.headers['x-access-token'] || request.headers['authorization'] || request.headers['Authorization'];
    if(!token){
        response.status(401).json({
            status: 401,
            message: "Bad request, acceso denegado, no cuenta con un token valido."
        });
    }else{
        if(token.startsWith('Bearer ')){
            token = token.slice(7, token.length);
        }
        jwt.verify(token, config.SECRET_KEY, (error, decoded) => {
            if(error){
                response.status(401).json({
                    status: 401,
                    message: "Bad request, token erroneo o ya expiró"
                });
            }else{
                if(decoded.data.role_id == 1){
                    next();
                }else{
                    response.status(401).json({
                        status: 401,
                        message: "Bad request, no cuenta con los permisos suficientes para acceder a esta información"
                    });
                }
            }
        });
    }
};

const roleClient = async (request, response, next) => {
    let token = request.headers['x-access-token'] || request.headers['authorization'] || request.headers['Authorization'];
    if(!token){
        response.status(401).json({
            status: 401,
            message: "Bad request, acceso denegado, no cuenta con un token valido."
        });
    }else{
        if(token.startsWith('Bearer ')){
            token = token.slice(7, token.length);
        }
        jwt.verify(token, config.SECRET_KEY, (error, decoded) => {
            if(error){
                response.status(401).json({
                    status: 401,
                    message: "Bad request, token erroneo o ya expiró"
                });
            }else{
                if(decoded.data.role_id == 1 || decoded.data.role_id == 2){
                    next();
                }else{
                    response.status(401).json({
                        status: 401,
                        message: "Bad request, no cuenta con los permisos suficientes para acceder a esta información"
                    });
                }
            }
        });
    }
};

module.exports = {
    validateExistsToken,
    isLogged,
    roleAdmin,
    roleClient
};