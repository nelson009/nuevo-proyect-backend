const Router = require("koa-router");
const{
    listarProductosController,
    listarProductoIdController,
    guardarProductoController,
    actualizarProductoController,
    eliminarProductoController
} = require("../controllers/productos.controller");
const router = new Router({
    prefix: '/api/productos'
});

router.get('/', listarProductosController);
router.get("/:id", listarProductoIdController);
router.post("/", guardarProductoController);
router.put("/:id", actualizarProductoController);
router.delete("/:id", eliminarProductoController);

module.exports = router;