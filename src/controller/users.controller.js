import {prisma} from "../database/connection";
import config from "../config"
import bcrypt from "bcryptjs";
import handleError from "../errors/handle.error"

const getUsers = async (request, response) => {
    try {
        const result = await prisma.user.findMany({
            select: {
                name: true,
                email: true,
                telefono: true,
                documento: true,
            }
        });
        if(result){
            response.status(200).json({
                status: 200,
                result
            });
        }else{
            response.status(200).send({
                status: 200,
                message: "Actualmente no se encuentran registros"
            });
        } 
    } catch (error) {
        handleError.error(response,error);
    }
};

const getUser = async (request, response) => {
    try {
        const {id} = request.params;
        const result = await prisma.user.findUniqueOrThrow({
            where: {
                id: parseInt(id)
            },
            select: {
                name: true,
                email: true,
                telefono: true,
                documento: true,
                RoleUser: {
                    select: {
                        role_id: true,
                        role: {
                            select: {
                                role: true,
                            },
                        },
                    },
                },
            }
        });
        response.status(200).json({
            status: 200,
            result,
        });
    } catch (error) {
        handleError.error(response,error);
    }
}

const addUser = async (request, response) => {
    try {
        const {name, documento, telefono, email, password, role_id} = request.body;
        const password_encrypted = bcrypt.hashSync(password, 10);
        await prisma.user.create({
            data: {
                name: name,
                documento: documento,
                telefono: telefono,
                email: email,
                password: password_encrypted,
                RoleUser: {
                    create: {
                        role_id: parseInt(role_id)
                    }
                },  
            },
            include: {
                RoleUser: true
            }
        });
        response.status(201).json({
            status: 201,
            message: "user add successful"
        });
    } catch (error) {
        handleError.error(response,error);
    }
}

const updateUser = async (request, response) => {
    try {
        const {id} = request.params;
        const {name, documento, telefono, email, password} = request.body;
        await prisma.user.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name: name,
                documento: documento,
                telefono: telefono,
                email: email,
            },
        });
        response.status(200).json({
            status: 200,
            message: "User updated successful"
        });
    } catch (error) {
        handleError.error(response,error);
    }
}

const deleteUser = async(request, response) => {
    try {
        const {id} = request.params;
        await prisma.user.delete({
            where: {
                id: parseInt(id),
            },
        });
        response.status(200).json({
            status: 200,
            message: "User deleted successful"
        });
    } catch (error) {
        handleError.error(response,error);
    }
}

const updateRole = async (request, response) => {
    try {
        const {id} = request.params;
        const {role_id} = request.body;
        const result = await prisma.RoleUser.updateMany({
            where: {
                user_id: parseInt(id),
            },
            data: {
                role_id: parseInt(role_id),
            },
        });
        console.log(id);
        response.status(200).json({
            status: 200,
            message: "Role User uppdated successful"
        });
    } catch (error) {
        handleError.error(response,error);
    }
}

export const method = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    updateRole
}