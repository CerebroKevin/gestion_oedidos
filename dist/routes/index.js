"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _cliente = require("../controllers/cliente");
var _producto = require("../controllers/producto");
var _pedido = require("../controllers/pedido");
var router = (0, _express.Router)();
//CRUD CLIENTES
router.get("/client", _cliente.methods_cli.getAllClientes);
router.get("/client/:cli_cedula", _cliente.methods_cli.getClienteByCedula);
router.post("/client", _cliente.methods_cli.postCliente);
router.put("/client/", _cliente.methods_cli.putCliente);
router.put("/client/:cli_cedula", _cliente.methods_cli.deleteCliente);

//CRUD PRODUCTOS
router.get("/product", _producto.methods_pro.getAllProductos);
router.get("/product/:pro_codigo", _producto.methods_pro.getProductByCodigo);
router.post("/product", _producto.methods_pro.postProducto);
router.put("/product", _producto.methods_pro.putProducto);
router.put("/product/:pro_codigo", _producto.methods_pro.deleteProducto);

//CRD PEDIDO_CAB
router.get("/order", _pedido.methods_ped.getAllPedidos);
router.get("/order/:ped_cab_id", _pedido.methods_ped.getPedidoById);
router.post("/order", _pedido.methods_ped.postPedido);
router.put("/order/:ped_cab_id", _pedido.methods_ped.deletePedido);
var _default = router;
exports["default"] = _default;