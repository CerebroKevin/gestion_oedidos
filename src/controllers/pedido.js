const {db} = require("../cnn");

const getAllPedidos = async (req,res)=>{
    try{
        const result= await db.any("select * from pedido_cab where ped_cab_estado is true order by ped_cab_id asc");
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.mesagge);
    }
}

const getPedidoById= async(req,res)=>{
    try{
        const {ped_cab_id}= req.params;
        if(!(ped_cab_id===undefined)){
            const result= await db.any(`select * from pedido_cab where ped_cab_estado is true and ped_cab_id=$1`,[ped_cab_id]);
            const products=await db.any(`select * from pedido_det where ped_det_cebecera=$1`,[ped_cab_id]);
            const num_products=products.length;
            const obj_json=[]
            if(result.length>0){
                
            obj_json.push({
                ped_det_id:result[0].ped_cab_id,
                ped_cab_fecha:result[0].ped_cab_fecha,
                ped_cab_subtotal:result[0].ped_cab_subtotal,
                ped_cab_iva:result[0].ped_cab_iva,
                ped_cab_total:result[0].ped_cab_total,
                ped_cab_cliente:result[0].ped_cab_cliente,
                ped_cab_estado:result[0].ped_cab_estado,
                pedido_det:[]

            })
            
            for(let i=0;i<num_products;i++){
                obj_json[0].pedido_det.push({
                    ped_det_id: products[i].ped_det_id,
                    ped_det_producto:products[i].ped_det_producto,
                    ped_det_cantidad: products[i].ped_det_cantidad,
                    ped_det_precio_unitario:products[i].ped_det_precio_unitario,
                    ped_det_precio_total:products[i].ped_det_precio_total
                })
            }           
            }
            res.json(obj_json);
        }

    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}


const postPedido= async (req,res)=>{
    try{
        const{
            ped_cab_cliente,
            pedido_det}=req.body

        let id_cab= await db.any(`insert into pedido_cab
        (ped_cab_fecha,ped_cab_subtotal,ped_cab_iva,ped_cab_total,ped_cab_cliente,ped_cab_estado) values 
        (current_date,0.00,0.00,0.00,$1,true) returning ped_cab_id`,[ped_cab_cliente]);

        const num_details=pedido_det.length;
        id_cab=id_cab[0].ped_cab_id;
        let subtotal_cab=0, iva_cab=0, total_cab=0, total_det=0;

        for(let k=0;k<num_details;k++){
           let result_selet= await db.any(`select pro_precio_venta, pro_stock from producto where pro_id=$1`,[pedido_det[k].ped_det_producto]); 
           let precio_unitario=result_selet[0].pro_precio_venta;
           let pro_stock=result_selet[0].pro_stock-pedido_det[k].ped_det_cantidad;
           total_det=parseFloat((precio_unitario*pedido_det[k].ped_det_cantidad).toFixed(2));
           total_cab=total_cab+total_det;
           let result_det= await db.any(`insert into pedido_det 
           (ped_det_producto, ped_det_cantidad, ped_det_precio_unitario, ped_det_precio_total, ped_det_cebecera) values 
           ($1,$2,$3,$4,$5)`,[pedido_det[k].ped_det_producto, pedido_det[k].ped_det_cantidad, precio_unitario, total_det, id_cab])
           let result_pro= await db.any(`update producto set pro_stock=$1 where pro_id=$2`,[pro_stock,pedido_det[k].ped_det_producto]);
        }
        subtotal_cab= total_cab;
        total_cab=(total_cab*(1.12)).toFixed(2);
        iva_cab=total_cab-subtotal_cab;

        let update_prices = await db.any(`update pedido_cab set ped_cab_subtotal=$1,  ped_cab_iva=$2, ped_cab_total=$3
         where ped_cab_id=$4`,[subtotal_cab,iva_cab,total_cab,id_cab]);
        const result= await db.any(`select * from pedido_cab where ped_cab_id=$1`,[id_cab]);
        
        res.json(result);

    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

const deletePedido= async (req,res)=>{
    try{
        const {ped_cab_id}= req.params;
        if(!(ped_cab_id===undefined)){
            const result= await db.any(`update pedido_cab set ped_cab_estado=false where ped_cab_id=$1`,[ped_cab_id]);
            res.json(result);
        }

    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}


export const methods_ped={
    getAllPedidos,
    getPedidoById,
    postPedido,
    deletePedido
}