const { db } = require("../cnn");

const getAllClientes= async (req,res)=>{
    try { 
        const result = await db.any(`select * from cliente where cli_estado is true order by cli_id`);
        res.json(result) ;
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}
const getClienteByCedula= async (req,res)=>{
    try{
        const {cli_cedula}= req.params;
        const result = await db.any(`select * from cliente where cli_estado is true and cli_cedula =$1`,[cli_cedula]);
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}

const postCliente= async(req,res)=>{
    try{
        const{cli_cedula,cli_nombres,cli_apellidos,cli_direccion,cli_num_celular,cli_correo}= req.body;
        if(!(cli_cedula=== undefined || cli_nombres===undefined || cli_apellidos===undefined|| 
            cli_direccion===undefined || cli_num_celular===undefined || cli_correo===undefined)){
                const result= await db.any(`insert into cliente 
                (cli_cedula,cli_nombres,cli_apellidos,cli_direccion,cli_num_celular,cli_correo,cli_estado) 
                values ($1,$2,$3,$4,$5,$6,$7) returning *`,[cli_cedula,cli_nombres,cli_apellidos,cli_direccion,cli_num_celular,cli_correo,true]);
                res.json(result);
            } 
    }catch(error){
        res.status(500)
        res.send(error.message)
    }
}


const putCliente= async(req,res)=>{
    try{
            
            
        const{cli_cedula,cli_nombres,cli_apellidos,cli_direccion,cli_num_celular,cli_correo}= req.body;

        if(!(cli_cedula===undefined ||cli_nombres===undefined || cli_apellidos===undefined|| 
            cli_direccion===undefined || cli_num_celular===undefined || cli_correo===undefined)){

                const result = await db.any(`update cliente set 
                cli_nombres=$2,
                cli_apellidos=$3,
                cli_direccion=$4,
                cli_num_celular=$5,
                cli_correo=$6 where cli_cedula=$1`,[cli_cedula,cli_nombres,cli_apellidos,cli_direccion,cli_num_celular,cli_correo]);
                res.json(result);
                   
                } 
        
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
}


const deleteCliente= async(req,res)=>{
    try{
        const {cli_cedula}= req.params;
        if(!(cli_cedula===undefined)){
            const result= await db.any(`update cliente set cli_estado = false where cli_cedula=$1`,[cli_cedula]);
            res.json(result);
        }

    }catch(error){
        res.status(500);
        res.send(error.message);

    }
}

export const methods_cli={
    getAllClientes,
    getClienteByCedula,
    postCliente,
    putCliente,
    deleteCliente
}