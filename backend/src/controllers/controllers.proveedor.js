import {getConnection} from "./../database/database";

export async function postProveedor(req, res){
    try{
        const data = req.body;
        // console.log(data);
        const proveedor = {
            NombreProv: data.NombreProv,
            DireccionProv: data.DireccionProv,
            TelefonoProv: data.TelefonoProv
        }
        const connection = await getConnection();
        await connection.query("INSERT INTO proveedores SET ?", proveedor);
        res.status(200).send({prove: proveedor});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getProveedorById(req, res){
    try{
        const id = req.params.id;
        console.log(id);
        const connection = await getConnection();
        const resultado = await connection.query("SELECT * FROM proveedores WHERE idProveedor = ?", id);
        res.status(200).send({proveedor: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function putProveedor(req, res){
    try{
        const id = req.params.id;
        const data = req.body; 
        // console.log(id);
        // console.log(data);
        const proveedor = {
            NombreProv: data.NombreProv,
            DireccionProv: data.DireccionProv,
            TelefonoProv: data.TelefonoProv
        }
        const connection = await getConnection();
        const resultado = await connection.query("UPDATE proveedores SET ? WHERE idProveedor= ?", [proveedor, id]);
        res.status(200).send({proveedor: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function deleteProveedor(req, res){
    try{
        const id = req.params.id;

        const connection = await getConnection();
        const resultado = await connection.query("DELETE FROM proveedores  WHERE idProveedor= ?", id);
        res.status(200).send({proveedor: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getProveedorName(req, res){
    try{
        const nombre = req.params['nombre'];
        console.log(nombre);
        const connection = await getConnection();
        if(nombre === undefined){
            const resultado = await connection.query("SELECT * FROM proveedores WHERE NombreProv REGEXP LOWER('')");
            res.status(200).send({proveedor: resultado});
        }else{
            const resultado = await connection.query("SELECT * FROM proveedores WHERE NombreProv REGEXP LOWER('"+nombre+"')");
            res.status(200).send({proveedor: resultado});
        }
        
    }catch(error){
        res.status(500).send(error.message);
    }  
};

