const postProduct = async () => {
    const Newproduct = {
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        foto: document.getElementById('foto').value,
        descripcion: document.getElementById('descripcion').value,
        stock: document.getElementById('stock').value,
        codigo: document.getElementById('codigo').value
    };
    
    fetch('https://proyecto-backend-coder.herokuapp.com/api/productos?admin=true', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(Newproduct)
    })
    .then(() => {
        window.location.href = 'http://localhost:8080/listadeproductos.html'
    })

}
