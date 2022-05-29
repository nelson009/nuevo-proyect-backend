// let url = window.location.origin

// const postProduct = async () => {
//     const Newproduct = {
//         nombre: document.getElementById('nombre').value,
//         precio: document.getElementById('precio').value,
//         foto: document.getElementById('foto').value,
//         descripcion: document.getElementById('descripcion').value,
//         stock: document.getElementById('stock').value,
//         codigo: document.getElementById('codigo').value
//     };
    
//     fetch(`${url}/api/productos?admin=true`, {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json;charset=utf-8",
//         },
//         body: JSON.stringify(Newproduct)
//     })
//     .then(() => {
//         window.location.href = 'listadeproductos.html'
//     })

// }

// // .then((data) => {
// //     if(data.status === 400) {
// //         window.location.href = 'listadeproductos.html'
// //     }
// //     // window.location.href = 'listadeproductos.html'
// // })



let url = window.location.origin

const postProduct = async () => {
    const Newproduct = {
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        foto: document.getElementById('foto').value,
        descripcion: document.getElementById('descripcion').value,
        stock: document.getElementById('stock').value,
        codigo: document.getElementById('codigo').value
    };
    
    fetch(`${url}/graphql?`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            query: `
                mutation crearProducto {
                    guardarProductoController (datos: {nombre:"${Newproduct.nombre}", precio:11,foto:"${Newproduct.foto}",descripcion:"${Newproduct.descripcion}",codigo:"${Newproduct.codigo}",stock:${Newproduct.stock}}) {
                    id
                    nombre
                    precio
                    descripcion
                    codigo
                    foto
                    }
                }
            `
          })
    })

    .then(() => {
        window.location.href = 'listadeproductos.html'
    })

}
