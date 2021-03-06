let url = window.location.origin
let idCart
fetch(`${url}/api/carrito`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(res => res.json())
    .then(id => {
        // console.log(id)
        if (id === 'sesion expirada') {
           return window.location.href= 'login'
        }
       
        idCart = id
        fetch(`${url}/api/carrito/${id}/productos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(error => console.error(error))
            .then(data => {
                const totalPrecio = data.reduce((acc, ele) =>  acc + ele.precio * ele.cantidad,0)
                const renderProduct = Handlebars.compile(
                    `
        <h1 class="silver animate__animated animate__zoomIn container mb-4">Carrito de Compras</h1>
        <div class='detalle-cart'>
        <p class="name-0">Imagen</p>
        <p class="name-1">Producto</p>
        <p class="tamaño-letra">Cantidad</p>
        <p class="tamaño-letra">Precio</p>
        <p class="tamaño-letra">Eliminar</p>
        </div>
        {{#if products}}
            {{#each products}}
                <div  class='detalle-cart'>
                <div> <img src="{{foto}}" alt='imagen del producto' height='100px' width='100px'/></div>
                    <p class="name-1">{{nombre}}</p>
                    <p class="tamaño-letra">x({{cantidad}})</p>
                    <p class="tamaño-letra">{{precio}}</p>
                    <img class="image-cancel" src='../imagen/eliminar.png' alt='cart' height='30px' width='30px' onclick= "deleteProduct('{{id}}')"/>
                </div>
            {{/each}}
            <div class="container-flexfinish">
                <div><p class="total-precio">Precio total : ${totalPrecio}</p></div>
                <div><button class="btn btn-info" onclick="finalizarCompra()">Finalizar Compra</button></div>
            </div>
        {{else}}
        <div class= "bordeBlanco container">
            <div class=" mt-3 ">
                <h2 class="sub-titulo"> No hay productos</h2>
            </div>
        </div>
        {{/if}}
        `
                );
                // console.log('CARRITO GET', data);
                const html = renderProduct({ products: data });
                document.getElementById('cartProduc').innerHTML = html;

            });
    })

const deleteProduct = (idProduct) => {
    fetch(`${url}/api/carrito/${idCart}/productos/${idProduct}`, {
        method: 'DELETE',
    })
        .then(res => res.json())
        .catch(error => console.error(error))
        .then((data) => {
            if(data === "sesion exirada"){
                window.location.href = `carrito.html`
            }
            window.location.href = `carrito.html`
        })
};

const finalizarCompra = () => {

    fetch(`${url}/compra-finalizada`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
    })
    .then(res => res.json())
    .catch(error => console.error(error))
    .then(data => {
        // console.log(data)
        if(data === "sesion exirada"){
            window.location.href = `profile`
        }
        window.location.href = `profile`
    })
}

