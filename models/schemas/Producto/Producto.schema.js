const yup = require('yup');

class ProductoSchema {
    // esquema de validacion
    static #Schema = yup.object({
        nombre: yup.string().required(),
        precio: yup.number().required(),
        foto: yup.string().required(),
        codigo: yup.number().required(),
        stock: yup.number().required(),
        descripcion: yup.string().required(),
    })
    constructor(nombre, precio, foto, codigo, stock, timestamp, descripcion) {
        this.nombre = nombre;
        this.precio = precio;
        this.foto = foto;
        this.codigo =codigo;
        this.stock = stock;
        this.timestamp =timestamp ;
        this.descripcion = descripcion;
    }

    static async validate(inputPost) {
        try {
            return await ProductoSchema.#Schema.validate(inputPost);
        }
        catch(error) {
            throw error;
            
        }
    }
}

module.exports = ProductoSchema;