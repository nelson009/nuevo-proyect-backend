let url = window.location.origin

fetch(`${url}/api/productos?`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((res) => res.json())
  .catch((error) => console.error("Error:", error))
  .then((data) => {
    const renderProduct = Handlebars.compile(
      `
    <h1 class="silver animate__animated animate__zoomIn container mt-3">Vista de Productos</h1>
    {{#if products}}
        {{#each products}}
            <div class ="item-container">
            <div class = "contenedor-img"><img src="{{foto}}" alt=""></div>
            <p class = "nombre-producto">{{nombre}}</p>
            <p class = "nombre-producto">codigo: {{codigo}}</p>
            <p class = "nombre-producto">stock: {{stock}}</p>
            <P class = "tamañoLetra">precio: {{precio}}</P>
            <button type="button" class="btn btn-danger" onclick= "deleteProduct('{{id}}')">Eliminar</button>
            <a href="${url}/updateProduct.html?id={{id}}" class="btn btn-primary">Editar</a>
            <button type="button" class="btn btn-success " onclick= "addCart('{{id}}')">Agregar al Carrito</button>
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
    console.log("desde el back", data);
    const html = renderProduct({ products: data });
    document.getElementById("listaProductos").innerHTML = html;
  });

const deleteProduct = (id) => {
  fetch(`${url}/api/productos/${id}?admin=true`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then(() => {
      window.location.href = "listadeproductos.html";
    })
    .catch((error) => console.error(error));
};

const addCart = (id) => {
  console.log("estes el tipo de id:", typeof id, id);
  fetch(`${url}/api/carrito/${id}/productos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => console.log("POST CART", res));
};
