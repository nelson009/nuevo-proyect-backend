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
        email: document.getElementById("email").value,
        fecha: Fecha(),
        texto: document.getElementById("texto").value,
        };
   
    socket.emit("messageFront", message);
    document.getElementById("texto").value= "";
    document.getElementById("texto").focus();
    }
    return false
}

socket.on("chat", (data) =>{
    document.getElementById("messagesId").innerHTML = data.map(
    ({email,texto,fecha}) => 
    `
    <div class="mb-3">
    <strong class="email-color">${email}</strong>
    <span class="fecha-color">[${fecha}]:</span>
    <em class="text-color">${texto}</em>
    </div>
    `
    ).join(" ");
})

const Fecha = () => {
    const hoy = new Date()
    let dia= hoy.getDate();
    let mes = hoy.getMonth() + 1;
    let año = hoy.getFullYear();
    dia = ('0' + dia).slice(-2);
    mes = ('0' + mes).slice(-2);
    let hora = hoy.getHours();
    let minutos = hoy.getMinutes();
    let segundos = hoy.getSeconds();
    const fecha = `${dia}/${mes}/${año} ${hora}:${minutos}:${segundos}`
    return fecha
}