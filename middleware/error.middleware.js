const { apiFailedResponse } = require("../utils/utils");

//si es un middleware de error se define los 4 parametros en la funcion(error, req, res, next). Para que funcione la logica como middleware de error, sino lo hacemos no funciona
const errorMiddleware = (error, req, res, next) => {
    console.log('moddleware',error);
    // error.status lo tomamos de la classe CustomError. Este tiene los atributos status,message,datails 
    //como nosotros arojamos errores con esta interfas,atributos ({status = statusCode, message = description, details = details})
    // lo esperamos en nuestro errorMiddleware
    const status = error.status || 500; // esto es por si se arrajo un error que no tenemos en cuanta que no tenga el atributo status(error.status). sino tiene el atributo es un error que arojo la api(por defecto le ponemos 500)con el que repondemos
    const errorObject = {
        message: error.message,
        details: error.details
    };
    const errorResponse = apiFailedResponse(errorObject, status);
    return res.status(status).json(errorResponse);
}

module.exports = errorMiddleware;