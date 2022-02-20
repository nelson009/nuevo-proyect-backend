
const query = window.location.search.substring(1);
console.log('windows location',query)
const id = query.split("=");
console.log('split', id)
const i = id[1];

const updateProduct = async () => {
    const update = {
    nombre: document.getElementById('nombre').value,
    precio: document.getElementById('precio').value,
    foto: document.getElementById('foto').value,
    descripcion: document.getElementById('descripcion').value,
    stock: document.getElementById('stock').value,
    codigo: document.getElementById('codigo').value,
    }

    fetch(`http://localhost:8080/api/productos/${i}?admin=true`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(update)
    })
    .then(res => res.json())
    .then(res => console.log('post data',res))
    .then(() => {
        window.location.href = 'http://localhost:8080/listadeproductos.html'
    })
} 

fetch(`http://localhost:8080/api/productos/${i}`, {
    method: 'GET', 
    headers:{
        'Content-Type': 'application/json'
}})
.then(res => res.json())
.then(data => {
    console.log('UPDATE',data)
 
    document.getElementById('nombre').value = data.nombre 
    document.getElementById('precio').value = data.precio 
    document.getElementById('foto').value = data.foto 
    document.getElementById('descripcion').value = data.descripcion 
    document.getElementById('stock').value = data.stock 
    document.getElementById('codigo').value = data.codigo 
})
