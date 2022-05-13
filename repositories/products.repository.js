const { productosApi } = require('../models/index');

class ProductsRepository {

    async getAll() {
        const productsDB =  await productosApi.getProduct();
        return productsDB
    }

    async getId(id) {
        const productDB = await productosApi.getProductId(id);
        return productDB;
    }

    async create(newProduct) {
        const addProduct = await productosApi.addProduct(newProduct);
        return addProduct;
    }

    async update(newProduct, id) {
        const updateProduct = await productosApi.updateProduct(newProduct, id);
        return updateProduct;
    }

    async delete(id) {
        const deleteProduct = await productosApi.deleteProduct(id);
        return deleteProduct;
    }
}

module.exports = ProductsRepository;