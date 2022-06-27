const fs = require('fs');
const { obtenerIndice, generadorId } = require('../../utils/funcionesUtiles/funciones');
const logger = require('../../logger/loggerConfig');
const CustomError = require('../../utils/error/CustomError');
const ProductoDTO = require('../dtos/producto.dto');
const { STATUS } = require('../../utils/constants/api.constants');

class ContenedorArchivo {
    static #fileCreated = false;
    constructor(nombre) {
        this.nombreArchivo = process.cwd() + `/DB/persistenciaFs/${nombre}`;
        if(!ContenedorArchivo.#fileCreated) {
            this.read()
                .then(() => {
                    ContenedorArchivo.#fileCreated = true;
                })
                .catch(() => {
                    if( nombre === "productos.txt"){
                        this.write([])  
                    }
                })
        }
    }

    async read(file = this.nombreArchivo) {
            return JSON.parse(await fs.promises.readFile(file, "utf-8"));
    }

    async write(dbItem, file = this.nombreArchivo) {
        await fs.promises.writeFile(file, JSON.stringify(dbItem, null, 2)); // o (dbItem, null, '\t' )
    }

    async findProductXId (arrayProducts,id) {
        const foundProduct = arrayProducts.find(ele => ele.id === +id);
        if (!foundProduct) {
            throw new CustomError(
                STATUS.NOT_FOUND,
                `el producto con id: ${id} no existe en el registro`
            );
        }
        return foundProduct;
    }

    async getProduct() {
        try {
            return await this.read();
        } catch (error) {
            throw new CustomError(
                STATUS.INTERNAL_ERROR,
                'Error buscando productos',
                error,
            );
        }
    }

    async getProductId(id) {
        try {
            const data = await this.getProduct();
        
            return await this.findProductXId(data,id);
        } catch (error) {
            throw new CustomError(
                STATUS.INTERNAL_ERROR,
                `Error buscando producto por ID: ${id}`,
                error,
            );
        }
    }

    async addProduct(Product) {
        try {
            const Products = await this.getProduct();
            const nuevoProducto = new ProductoDTO(Product, generadorId(Products, Products[0]));
            Products.push(nuevoProducto);
            await this.write(Products);

            return nuevoProducto;
        } catch (error) {
            throw new CustomError(
                STATUS.INTERNAL_ERROR,
                'Error creando producto',
                error,
            );
        }
    }

    async updateProduct(productoNuevo, id) {
        try {
            const data = await this.getProduct()
            await this.findProductXId(data,id)
            const update = new ProductoDTO({...productoNuevo, timestamp: Date.now()}, id)
            const { nombre, descripcion, codigo, foto, precio, stock, timestamp } = update;

            const ProductoActualizado = {
                ...data[obtenerIndice(data, id)],
                nombre,
                descripcion,
                codigo,
                foto,
                precio,
                stock,
                timestamp
            }
            data[obtenerIndice(data, id)] = ProductoActualizado
            await this.write(data)

            return ProductoActualizado
        } catch (error) {
            throw new CustomError(
                STATUS.INTERNAL_ERROR,
                'Error actualizando producto',
                error,
            );
        }
    }

    async deleteProduct(id) {
        try {
            const data = await this.getProduct()
            await this.findProductXId(data,id)
          
            const delteProduct = data.splice(obtenerIndice(data, id), 1)
            await this.write(data)

            return delteProduct
        } catch (error) {
            throw new CustomError(
                STATUS.INTERNAL_ERROR,
                'Error eliminando producto',
                error,
            );
        }

    }

}

module.exports = ContenedorArchivo