let idCart
fetch(`https://proyecto-backend-coder.herokuapp.com/api/carrito`,{
    method: 'POST', 
    headers:{
        'Content-Type': 'application/json'
}})
.then(res => res.json())
.then(id => {
    idCart= id
fetch(`https://proyecto-backend-coder.herokuapp.com/api/carrito/${id}/productos`,{
    method: 'GET', 
    headers:{
        'Content-Type': 'application/json'
}})
.then(res => res.json())
.catch(error => console.error(error))
.then(data => {
const renderProduct = Handlebars.compile(
    `
    <h1 class="silver animate__animated animate__zoomIn container mb-4">Carrito de Compras</h1>
    <div class='detalle-cart'>
    <p class="name-0">Imagen</p>
    <p class="name-1">Producto</p>
    <p class="tamaño-letra">Codigo</p>
    <p class="tamaño-letra">Precio</p>
    <p class="tamaño-letra">Eliminar</p>
    </div>
    {{#if products}}
        {{#each products}}
            <div  class='detalle-cart'>
            <div> <img src="{{foto}}" alt='imagen del producto' height='100px' width='100px'/></div>
                <p class="name-1">{{nombre}}</p>
                <p class="tamaño-letra">{{codigo}}</p>
                <p class="tamaño-letra">{{precio}}</p>
                <img class="image-cancel" src='../imagen/eliminar.png' alt='cart' height='30px' width='30px' onclick= "deleteProduct('{{id}}')"/>
            </div>
        {{/each}}
    {{else}}
    <div class= "bordeBlanco container">
        <div class=" mt-3 ">
            <h2 class="sub-titulo"> No hay productos</h2>
        </div>
    </div>
    {{/if}}
    `
);
console.log('CARRITO GET',data);
const html = renderProduct({products:data});
document.getElementById('cartProduc').innerHTML = html;

});
})

const deleteProduct = (idProduct) => {
    fetch(`https://proyecto-backend-coder.herokuapp.com/api/carrito/${idCart}/productos/${idProduct}`,{
        method: 'DELETE',
    })
    .then(res => res.json())
    .catch( error => console.error(error))
    .then(() => {
        window.location.href = 'http://localhost:8080/carrito.html'
    })
}
