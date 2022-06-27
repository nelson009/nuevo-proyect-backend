# Tienda Online cusro Bckend CoderHause 2022
## Respuestas a las consignas del proyecto final:
> 1.Se implemento  capas utilizando el patrón MVC (modelo, vista , controlador, ruteo, servicio), para la persistencia de datos se utilizo Mongo Atlas implementando los patrones DAO y DTO, se puede utilizar otras bases de datos como Memoria, Firebase y archivo(FileSystem) con solo modificar la variable de entorno, para esto se aplico el patrón Factory, ademas tiene un servicio de chat implementado con Sockets y el patrón Repository(este ultimo no tiene una funcion util). La parte de Frontend se realizo en el mismo servidor exponiendo la carpeta public para tales efectos. Se utilizo Handlebars, Javascript, Bootstrap y flex.
 
> 2.El codigo es escabable, si se desea agregar mas logica al servidor solo se debe programar sin modificar el codigo existente gracias a la separación por capas logradas utilizando el patrón MVC.

### Proyecto subido a Heroku
 - se use mongo atlas como base de datos (al estar mas desarollado la vista del carrito y tener la persistencia en la nube)
 - ver online: https://proyecto-backend-coder.herokuapp.com/
 - usuario de la app: aitor@gmail.com, pass: 3
 
### Twilio
 - el usuario: aitor@gmail.com, pass: 3 (numero de telelofo registrado en twilio)
 - para que le llegue un mensaje de texto al usuario . Este numero de tel(user) tiene que estar registrado previamenete en twilio
 - en watssap hay que enviar "join done-willing" al nuemero de twilio cada 72 hs. Para que llegue el mensaje
