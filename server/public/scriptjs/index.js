
const socket = io();

socket.on("tableProduct", products => {

    fetch('http://localhost:8080/template/productos.hbs')
    .then(response => response.text())
    .then(data => {

        const renderProduct = Handlebars.compile(data);
        const html = renderProduct({products})
        document.getElementById('tablaProductos').innerHTML = html
    })
})

const addMessage = () =>{
    if(document.getElementById("email").value.length > 0){
    const message = {
        author: {
            email: document.getElementById("email").value,
            nombre: document.getElementById("messageNombre").value,
            apellido: document.getElementById("messageApellido").value,
            edad: document.getElementById("messageEdad").value,
            alias: document.getElementById("messageAlias").value,
            avatar: document.getElementById("messageAvatar").value,
        },
        texto: document.getElementById("texto").value,
        };
   
    socket.emit("messageFront", message);
    document.getElementById("texto").value= "";
    document.getElementById("texto").focus();
    }
    return false;
};

const authorSchema = new normalizr.schema.Entity('author',{},{idAttribute: 'email'});

const mensajeSchema = new normalizr.schema.Entity('post',{ author: authorSchema }, {idAttribute: '_id' });

const mensajesSchema = new normalizr.schema.Entity('posts',{messages: [mensajeSchema]});

socket.on("chat", (data) =>{

    console.log('-------------- NORMALIZADO --------------');

    console.log(data)
    const normalizedLength = JSON.stringify(data).length
    console.log(normalizedLength);

    console.log('-------------- DESNORMALIZADO --------------');

    const denormalizedData = normalizr.denormalize(data.result,mensajesSchema,data.entities,);
    console.log(denormalizedData);
    const denormalizedLength = JSON.stringify(denormalizedData).length;
    console.log(denormalizedLength);

    console.log('-------------- COMPRESION --------------');

    const compresion = `${Math.round((normalizedLength / denormalizedLength) * 100).toFixed(2)}%`
    console.log(compresion);

   document.getElementById("messagesId").innerHTML = denormalizedData.messages.map(
    ({texto,author,fecha}) => 
    `
    <div class="mb-3">
    <strong class="email-color">${author.email}</strong>
    <span class="fecha-color">[${fecha}]:</span>
    <em class="text-color">${texto}</em>
    <img src='${author.avatar}'height="30" width="30" class="avatarMensajes">
    </div>
    `
    ).join(" ");
    document.getElementById("compresion").innerHTML = `Centro de Mensajes (${compresion})`;
})

