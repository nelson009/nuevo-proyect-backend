
let productosApi;
let carrito;

switch(process.env.DATASOURCE) {
    case 'memoria':
        const ProductDaoMemoria =  require('./daos/productos/ProductsDaoMemoria');
        const CarritoDaoMemoria =  require('./daos/carritos/CarritoDaoMemoria');

        productosApi = new ProductDaoMemoria ();
        carrito = new CarritoDaoMemoria();
        break;
    case "firebase":
        const ProdutcDaoFirebase = require('./daos/productos/ProductsDaoFirebase');
        const CarritoDaoFirebase = require('./daos/carritos/CarritoDaoFirebase');

        productosApi = new ProdutcDaoFirebase ();
        carrito = new CarritoDaoFirebase();
        break;
    case "mongo":
        const ProdutcDaoMongoDB = require('./daos/productos/ProductsDaoMongoDB');
        const CarritoDaoMongoDB = require('./daos/carritos/CarritosDaoMongoDb');
    
        productosApi = new ProdutcDaoMongoDB ();
        carrito = new CarritoDaoMongoDB();
        break;
    default:
        const ProdutcDaoArchivo = require('./daos/productos/ProductsDaoArchivo');
        const CarritoDaoArchivo = require('./daos/carritos/CarritoDaoArchivo');

        productosApi = new ProdutcDaoArchivo ();
        carrito = new CarritoDaoArchivo();
}

module.exports = { productosApi, carrito, MensajeSqlite3: require('./mensajes/mensajeSqlite3'),};