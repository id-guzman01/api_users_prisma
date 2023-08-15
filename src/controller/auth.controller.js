import {prisma} from "../database/connection";
import config from "../config"
import bcrypt from "bcryptjs";
import handleError from "../errors/handle.error";
import jwt from "jsonwebtoken"

const login = async(request, response) => {
    try {
        const {email, password} = request.body;
        const result = await prisma.user.findUniqueOrThrow({
            where: {
                email: email,
            },
            select: {
                id: true,
                name: true,
                password: true,
                RoleUser: {
                    select: {
                        role_id: true,
                    },
                },
            }
        });
        if(!result){
            response.status(500).json({
                status: 500,
                message: "Email no registrado"
            });
        }else{
            if(bcrypt.compareSync(password,result.password)){
                const data = {
                    id: result.id,
                    name: result.name,
                    role_id: result.RoleUser[0].role_id
                };
                const payload = {
                    check: true
                };
                const token = jwt.sign({
                    payload,
                    data: data
                }, config.SECRET_KEY, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) });
                if(!token){
                    response.status(401).json({
                        status: 401,
                        message: "Bad request, intente más tarde"
                    });
                }else{
                    response.status(200).json({
                        status: 200,
                        message: "User is logged successful",
                        token
                    });
                }
            }else{
                response.status(500).json({
                    status: 500,
                    message: "password erronea"
                });
            }
        }
    } catch (error) {
        handleError.error(response,error);
    }
};

const changuePassword = async (request, response) => {
    try {
        const {id} = request.params;
        const {new_password} = request.body;
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: parseInt(id),
            },
            select: {
                id: true, 
                password: true,
            },
        });
        if(!user){
            response.json({
                status: 401,
                message: "Bad request, usuario no registrado"
            });
        }else{
            if(bcrypt.compareSync(new_password,user.password)){
                response.json({
                    status: 401,
                    message: "Bad request, la contraseña nueva no puede ser igual a la actual"
                });
            }else{
                const password = bcrypt.hashSync(new_password,8);
                await prisma.user.update({
                    where: {
                        id: parseInt(user.id),
                    },
                    data: {
                        password: password,
                    }
                });
                response.status(200).json({
                    status: 200, 
                    message: "Password updated successful"
                });
            }
        }
    } catch (error) {
        handleError.error(response,error);
    }
};

export const method = {
    login,
    changuePassword
}