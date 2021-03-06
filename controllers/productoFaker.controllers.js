const faker = require('faker');

faker.locale= 'es';

// obtiene un vista renderizada en tabla de productos faker
const listaDeProductosFaker = (req, res) => {
    const products = [];
    const cantidad = 5

    for(i=1; i <= cantidad; i++){
        products.push({
            nombre: faker.vehicle.vehicle(),
            precio: faker.finance.amount(),
            foto: faker.image.transport()
        })
    }
    res.render("main", {products});
}

module.exports = listaDeProductosFaker;