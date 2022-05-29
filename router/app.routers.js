
const expressGraphql = require("express-graphql");
const graphql = require("graphql");
const {
    listarProductosController,
    listarProductoIdController,
    guardarProductoController,
    actualizarProductoController,
    eliminarProductoController,
} = require('../controllers/productos.controllers');

class RouterProductos {

  start() {
    const schema = graphql.buildSchema(`
    type Producto {
        id: ID!
        nombre: String,
        precio: Int,
        foto: String,
        codigo: String,
        stock: Int,
        descripcion: String,
        timestamp: String,
      }
      input ProductoInput {
        nombre: String,
        precio: Int,
        foto: String,
        codigo: String,
        stock: Int,
        descripcion: String,
      }
      type Query {
        listarProductoIdController(id: ID!): Producto,
        listarProductosController(campo: String, valor: String): [Producto],
      }
      type Mutation {
        guardarProductoController(datos: ProductoInput): Producto
        actualizarProductoController(id: ID!, datos: ProductoInput): Producto,
        eliminarProductoController(id: ID!): Producto,
      }
    `);

    return expressGraphql.graphqlHTTP({
      schema,
      rootValue: {
        listarProductoIdController,
        listarProductosController,
        guardarProductoController,
        actualizarProductoController,
        eliminarProductoController
      },
      graphiql: true,
    });
  }
}

module.exports = RouterProductos;