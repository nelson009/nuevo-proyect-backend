

const query = window.location.search.substring(1);
// console.log('windows location',query)
const id = query.split("=");
// console.log('split', id)
const i = id[1];
let url = window.location.origin

const updateProduct = async () => {
    const update = {
    nombre: document.getElementById('nombre').value,
    precio: document.getElementById('precio').value,
    foto: document.getElementById('foto').value,
    descripcion: document.getElementById('descripcion').value,
    stock: document.getElementById('stock').value,
    codigo: document.getElementById('codigo').value,
    }

    fetch(`${url}/graphql?`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            query: `
            mutation actualizarProducto{
                actualizarProductoController(id:"${i}",datos:{nombre:"${update.nombre}", precio:${update.precio},foto:"${update.foto}",descripcion:"${update.descripcion}",codigo:"${update.codigo}",stock:${update.stock}}) {
                  nombre
                  precio
                }
            }
            `
        })
    })

    .then(res => res.json())
    .then(res => console.log('post data',res))
    .then(() => {
        window.location.href = 'listadeproductos.html'
    })
} 

fetch(`${url}/graphql?`, {
    method: 'POST', 
    headers:{
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        query: `
        query productoXID{
            listarProductoIdController(id: "${i}"){
                id
                nombre
                precio
                foto
                codigo
                descripcion
                stock
            }
          }
        `
    })
})
.then(res => res.json())
.then(data => {
    let productxID = data.data.listarProductoIdController
    document.getElementById('nombre').value = productxID.nombre 
    document.getElementById('precio').value = productxID.precio 
    document.getElementById('foto').value = productxID.foto 
    document.getElementById('descripcion').value = productxID.descripcion 
    document.getElementById('stock').value = productxID.stock 
    document.getElementById('codigo').value = productxID.codigo 
})
