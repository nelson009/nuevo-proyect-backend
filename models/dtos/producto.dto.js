// class ProductoDTO {
//     constructor(post, _id) {
//         //le asignamos todas las propiedads del objeto que llegan por parametro
//         //llega nombre,precio,body. con esta linea,comando . Estamos creando,asignando a este objeto (this, al que estamos referenciando en esta clase)todos los atributos que reciben de entrada
//         Object.assign(this, post);
//         this.timestamp = post.timestamp || Date.now();
//         // this.updateTimestamp = Date.now();
//         if(_id) {
//             // this._id = _id;
//             this.id = _id;
//         }
//     }
// };

// module.exports = ProductoDTO;



class ProductoDTO {
    constructor({ nombre, precio, foto, descripcion, codigo ,timestamp,stock}, _id) {
        this.timestamp = timestamp || Date.now()
        this.nombre = nombre;
        this.precio = precio;
        this.foto = foto,
        this.descripcion = descripcion,
        this.codigo = codigo
        this.stock = stock
        if(_id) {
            this.id = _id;
        }
    }
};

module.exports = ProductoDTO;