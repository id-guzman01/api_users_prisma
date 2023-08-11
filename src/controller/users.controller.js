import {prisma} from "../database/connection";

const getUsers = async (request, response) => {
    try {
        const result = await prisma.user.findMany();
        if(result){
            response.json(result);
        }else{
            response.status(200);
            response.send({
                status: 200,
                message: "Actualmente no se encuentran registros"
            });
        } 
    } catch (error) {
        response.status(500);
        response.send({
            status: 500,
            message: "Bad request, actualmente no es posible procesar la petición"
        });
    }
};

const getUser = async (request, response) => {
    try {
        const {id} = request.params;
        const result = await prisma.user.findUniqueOrThrow({
            where: {
                id: parseInt(id)
            },
            include: {
                RoleUser: {
                    include: {
                        role: {
                            select: {
                                role: true
                            },
                        },
                    },
                },
            },
        });
        response.json(result);
    } catch (error) {
        if(error.code == 'P2025'){
            response.status(500);
            response.send({
                status: 500,
                message: "Bad request, no se encuentra el registro solicitado"
            });
        }else{
            response.status(500);
            response.send({
                status: 500,
                message: "Bad request, el parametro a buscar no es un formato correcto"
            });
        }
    }
}

const addUser = async (request, response) => {
    try {
        const {name, documento, telefono, email, password, role_id} = request.body;
        await prisma.user.create({
            data: {
                name: name,
                documento: documento,
                telefono: telefono,
                email: email,
                password: password,
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
        response.json({
            status: 201,
            message: "user add successful"
        });
    } catch (error) {
        if(error.code == 'P2002'){
            response.status(500);
            response.json({
                status: 500,
                message: "Bad request, el email que ingreso ya se encuentra registrado"
            });
        }else{
            response.status(500);
            response.json({
                status: 500,
                message: "Bad request, el parametro a buscar no es un formato correcto"
            });
        }
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
                password: password
            },
        });
        response.status(200);
        response.json({
            status: 200,
            message: "User updated successful"
        });
    } catch (error) {
        if(error.code == 'P2002'){
            response.status(500);
            response.json({
                status: 500,
                message: "Bad request, el email ingresado ya se encuentra registrado"
            });
        }else{
            response.status(500);
            response.json({
                status: 500,
                message: "Bad request, actualmente no es posible realizar la petición"
            });
        }
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
        response.status(200);
        response.json({
            status: 200,
            message: "user deleted successful"
        });
    } catch (error) {
        if(error.code == 'P2025'){
            response.status(500);
            response.json({
                status: 500,
                message: "Bad request, el registro que intenta registrar no existe"
            });
        }else{
            response.status(500);
            response.json({
                status: 500,
                message: "Bad request, actualmente no es posible realizar la petición"
            });
        }
    }
}

export const method = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser
}