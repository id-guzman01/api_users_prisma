
const error = (response, error) => {
    switch (error.code) {
        case "P2025":
            response.status(500).json({
                status: 500,
                message: "Bad request, el recurso solicitado no existe"
            });
            break;
        case "P2002":
            response.status(500).json({
                status: 500,
                message: "Bad request, el email que ingreso ya se encuentra registrado"
            });
            break;
        default:
            console.log(error);
            response.status(500).json({
                status: 500,
                message: "Bad request, actualmente no es posible realizar el proceso solicitdo"
            });
    };
};

module.exports = {
    error
}