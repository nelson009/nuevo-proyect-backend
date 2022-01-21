const socket = io();
socket.on("tableProduct", lista => {

    fetch('http://localhost:8080/productos.hbs')
    .then(response => response.text())
    .then(data => {

        let renderProduct = Handlebars.compile(data);
        document.getElementById('tablaProductos').innerHTML = renderProduct({products: lista })
    })
})
