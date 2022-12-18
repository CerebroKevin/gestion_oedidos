const {db}=require("../cnn");

const getAllProductos=async (req,res)=>{
    try{
        const result= await db.any("select * from producto where pro_estado is true order by pro_id asc");
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

const getProductByCodigo= async(req,res)=>{
    try{
        const {pro_codigo}= req.params;
        if(!(pro_codigo===undefined)){
            const result = await db.any(`select * from producto where pro_codigo=$1 and pro_estado is true`,[pro_codigo]);
            res.json(result);
        }
        
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

const postProducto= async (req,res)=>{
    try{
        const {pro_nombre,pro_marca,pro_categoria,pro_unidad_medida,pro_contenido,pro_precio_venta,pro_codigo,pro_stock} = req.body;
        if(!(pro_nombre===undefined || pro_marca===undefined || pro_categoria===undefined ||
            pro_unidad_medida===undefined || pro_contenido ===undefined || pro_precio_venta===undefined ||pro_codigo ===undefined || pro_stock=== undefined)){
                const result = await db.any(`insert into producto
                (pro_nombre,pro_marca,pro_categoria,pro_unidad_medida,pro_contenido,pro_precio_venta,pro_codigo, pro_estado, pro_stock) 
                values($1,$2,$3,$4,$5,$6,$7,$8,$9) returning *`,[pro_nombre,pro_marca,pro_categoria,pro_unidad_medida,pro_contenido,pro_precio_venta,pro_codigo, true,pro_stock]);
                res.json(result);
        }
    }catch(error){
        res.status(500);
        res.send(error.message);

    }
}

const putProducto= async(req,res)=>{
    try{
        const {pro_nombre,pro_marca,pro_categoria,pro_unidad_medida,pro_contenido,pro_precio_venta,pro_codigo,pro_stock} = req.body;
        if(!(pro_nombre===undefined || pro_marca===undefined || pro_categoria===undefined ||
            pro_unidad_medida===undefined || pro_contenido ===undefined || pro_precio_venta===undefined ||pro_codigo ===undefined || pro_stock===undefined)){
                const result = await db.any(`update producto set
                pro_nombre=$1, pro_marca=$2, pro_categoria=$3, pro_unidad_medida=$4,
                pro_contenido=$5, pro_precio_venta=$6, pro_stock=$8 where pro_codigo=$7 `,[pro_nombre,pro_marca,pro_categoria,pro_unidad_medida,pro_contenido,pro_precio_venta,pro_codigo,pro_stock]);
                res.json(result);
        }

    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

const deleteProducto= async(req,res)=>{
    try{
        const{pro_codigo}= req.params;
        if(!(pro_codigo===undefined)){
            const result = await db.any(`update producto set pro_estado=false where pro_codigo=$1`,[pro_codigo]);
            res.json(result);
        }

    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

export const methods_pro={
    getAllProductos,
    getProductByCodigo,
    postProducto,
    putProducto,
    deleteProducto
}