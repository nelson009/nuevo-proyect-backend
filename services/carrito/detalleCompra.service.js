const { carrito } = require('../../models/index');
const logger = require('../../logger/loggerConfig');
const { CORREO_GMAIL, configTransport, ACCOUNT_SID, AUTH_TOKEN, PHONE_TWILIO ,NUMBER_ADMIN } = require('../../config/config');
const { createTransport } =require ('nodemailer');
const twilio = require('twilio');

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);
const enviarMensaje = async (numberTwilio, numberUser,mesagge) => {
    try {
        const message = await client.messages.create({
            from: `${numberTwilio}`,
            to: `${numberUser}`,
            body: mesagge,
        });
        logger.info(message);
    }
    catch (error) {
        logger.error(error);
    }
};

const transporter = createTransport(configTransport);
const enviarCorreo = async (productos, email, firstName, totalPrecio) => {
    try {
        const mailOptions = {
            from: "Node@Server",
            to: CORREO_GMAIL,
            subject: `nuevo pedido de ${firstName}, ${email}`,
            html:
            `           
            <h1 style="color: green;"> Detalle de compra</h1>
            <ul style="list-style: none;">
                ${productos}
            </ul>
            <p style="color: red;">precio total: ${totalPrecio}</p>
            `,
        };

        const mail = await transporter.sendMail(mailOptions);
        logger.info(mail);
    }
    catch (error) {
        logger.error(error);
    }
};

const finalizarCompra = async (req) => {
    if(!req.user) return false
    const { email, firstName, telefono } = req.user;

    const idCarrito = await carrito.createCarrito(req);
    const listarProductos = await carrito.getProductEnCarrito(idCarrito.toString(), req);

    const totalPrecio = listarProductos.reduce((acc, ele) =>  acc + ele.precio * ele.cantidad,0)
    const htmlCartLi = listarProductos.reduce((acc, ele) => acc + `<li> ${ele.nombre} ${ele.descripcion} $${ele.precio} x(${ele.cantidad})</li>`,"");
    
    enviarCorreo(htmlCartLi, email, firstName, totalPrecio);

     //para que le llegue un mensaje de texto al usuario . Este numero de tel(user) tiene que estar registrado previamenete en twilio
    const mesaggeTwilioAuser = "su pedido ha sido recibido y se encuentra en proceso"
    enviarMensaje(PHONE_TWILIO , telefono, mesaggeTwilioAuser);

    //en watssap hay que enviar "join done-willing" al nuemero de twilio cada 72 hs. Para que llegue el mensaje
    const MesaggeWhatsapp = `nuevo pedido de ${firstName}, ${email}`
    enviarMensaje('whatsapp:+14155238886', `whatsapp:${NUMBER_ADMIN}`, MesaggeWhatsapp)

    return  await carrito.deleteCarrito(idCarrito.toString(),req);
};

module.exports = finalizarCompra;