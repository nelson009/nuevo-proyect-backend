const Koa = require('Koa');
const server = require('koa-static');
const path = require('path') ;
const koaBody = require('koa-body');
const productoRouter = require("./router/productos.router");

const PORT = process.env.PORT || 8080;
const app = new Koa();

app.use(koaBody());
app.use(server(path.resolve(__dirname, "./public")));

app.use(productoRouter.routes());

app.listen(PORT, () => {
    console.log(`Servidor escucnado en el puestro ${PORT}`);
})
