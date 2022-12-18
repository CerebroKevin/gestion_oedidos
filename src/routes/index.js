import { Router } from "express";
import {methods_cli} from "../controllers/cliente";
import {methods_pro } from "../controllers/producto";
import { methods_ped } from "../controllers/pedido";

const router=Router();
//CRUD CLIENTES
router.get("/client",methods_cli.getAllClientes);
router.get("/client/:cli_cedula",methods_cli.getClienteByCedula);
router.post("/client",methods_cli.postCliente);
router.put("/client/",methods_cli.putCliente);
router.put("/client/:cli_cedula",methods_cli.deleteCliente);

//CRUD PRODUCTOS
router.get("/product",methods_pro.getAllProductos);
router.get("/product/:pro_codigo",methods_pro.getProductByCodigo);
router.post("/product",methods_pro.postProducto);
router.put("/product",methods_pro.putProducto);
router.put("/product/:pro_codigo",methods_pro.deleteProducto);

//CRD PEDIDO_CAB
router.get("/order",methods_ped.getAllPedidos);
router.get("/order/:ped_cab_id",methods_ped.getPedidoById);
router.post("/order",methods_ped.postPedido);
router.put("/order/:ped_cab_id",methods_ped.deletePedido);
export default router;
