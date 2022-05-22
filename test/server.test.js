const mongoose = require('mongoose');
const supertest = require('supertest');
const { expect } = require('chai');
const server = require('../server');
const { mongodb } = require('../config/config');

const connectDB = async () => {
    try {
        await mongoose.connect(mongodb.uri);
        console.log('Database connected!');
    }
    catch (error) {
        throw Error('Error connectiong to data base =>', error);

    }
}

const startServer = async () => {
    return new Promise((resolve, reject) => {
        const PORT = 0;
        const connectedServer = server.listen(PORT, () => {
            console.log(`Servidor activo y escuchando en el puerto ${server.address().port}`);
            resolve(connectedServer);
        })

        connectedServer.on('error', (error) => {
            console.log(error);
            reject(error);
        })
    })
}

let request;
let app;
describe('Test api rest full', () => {
    before(async () => {
        await connectDB()
        app = await startServer();
        request = supertest(`http://localhost:${app.address().port}/api/productos`)
    })

    after(() => {
        mongoose.disconnect();
        app.close();
    })

    describe('GET', () => {
        it('Deberia retornar un status 200', async () => {
            const response = await request.get('/');
            //esperamos que el response.status sea igual a 200
            expect(response.status).to.eql(200)
        })
    })

    
    describe('GET', () => {
        const id = `6250a03c244187a6794e3ab3`
        it('Deberia retornar un producto por ID', async () => {
            const response = await request.get(`/${id}`);
            expect(response.status).to.eql(200)
            const user = response.body;
            expect(user).to.include.keys('nombre', 'precio', 'foto', "descripcion", 'stock', 'codigo', "timestamp", '_id');
        })
    })

    describe('POST', () => {
        const producto = {
            nombre: "prueba(SUPERTEST)",
            descripcion: "tv",
            codigo: 1,
            precio: 2000,
            foto: "https://images.fravega.com/f300/654f64238a932795128e5445ad1f8ed6.jpg.webp",
            stock: 1
        }
        it('Deberia agregar un nuevo producto', async () => {
            const response = await request.post('/?admin=true').send(producto);
            expect(response.status).to.eql(201);

            const user = response.body;
            expect(user).to.include.keys('nombre', 'precio', 'foto', "descripcion", 'stock', 'codigo', "timestamp");
            expect(user.nombre).to.eql(producto.nombre);
            expect(user.precio).to.eql(producto.precio);
            expect(user.foto).to.eql(producto.foto);
            expect(user.descripcion).to.eql(producto.descripcion);
            expect(user.stock).to.eql(producto.stock);
            expect(user.codigo).to.eql(producto.codigo);
        })
    })

    describe('PUT', () => {
        const producto2 = {
            nombre: "prueba(SUPERTEST)2",
            descripcion: "tv",
            codigo: 20,
            precio: 4000,
            foto: "https://images.fravega.com/f300/654f64238a932795128e5445ad1f8ed6.jpg.webp",
            stock: 20
        }
        const id = `6289e8e76a085e9f3297516a`
        it('Deberia actualizar un producto', async () => {
            const response = await request.put(`/${id}?admin=true`).send(producto2);
            expect(response.status).to.eql(200);

            const user = response.body;
            expect(user).to.include.keys('nombre', 'precio', 'foto', "descripcion", 'stock', 'codigo', "timestamp");
            expect(user.nombre).to.eql(producto2.nombre);
            expect(user.precio).to.eql(producto2.precio);
            expect(user.foto).to.eql(producto2.foto);
            expect(user.descripcion).to.eql(producto2.descripcion);
            expect(user.stock).to.eql(producto2.stock);
            expect(user.codigo).to.eql(producto2.codigo);
        })
    })

    describe('DELETE', () => {
        const id = `628a015b33477187d9942114`
        it('Deberia eliminar producto', async () => {
            const response = await request.delete(`/${id}?admin=true`);
            expect(response.status).to.eql(200);

            const user = response.body;
            expect(user).to.include.keys('id', "timestamp");
        })
    })
})

