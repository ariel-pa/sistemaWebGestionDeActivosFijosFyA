import {getConnection} from "./../database/database";

export async function postTipoActivo(req, res){
    try{
        const data = req.body;
        // console.log(data);
        const tipoactivo = {
            NombreActivo: data.NombreActivo,
            DescripcionMant: data.DescripcionMant
        }
        // console.log(rubro);
        const connection = await getConnection();
        await connection.query("INSERT INTO tiposactivos SET ?", tipoactivo);
        res.status(200).send({tipoactivo: tipoactivo});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getTiposActivos(req, res){
    try{
        const connection = await getConnection();
        const resultado = await connection.query("SELECT * FROM tiposactivos");
        res.status(200).send({tipoactivo: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getTipoActivoById(req, res){
    try{
        const id = req.params.id;
        // console.log(id);
        const connection = await getConnection();
        const resultado = await connection.query("SELECT * FROM tiposactivos WHERE idTipo = ?", id);
        res.status(200).send({tipoactivo: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function putTipoActivo(req, res){
    try{
        const id = req.params.id;
        const data = req.body; 
        
        const tipoactivo = {
            NombreActivo: data.NombreActivo,
            DescripcionMant: data.DescripcionMant
        }
        const connection = await getConnection();
        const resultado = await connection.query("UPDATE tiposactivos SET ? WHERE idTipo= ?", [tipoactivo, id]);
        res.status(200).send({tipoactivo: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function deleteTipoActivo(req, res){
    try{
        const id = req.params.id;

        const connection = await getConnection();
        const resultado = await connection.query("DELETE FROM tiposactivos  WHERE idtipo= ?", id);
        res.status(200).send({tipoactivo: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getTipoActivoName(req, res){
    try{
        const nombre = req.params['nombre'];
        // console.log(nombre);
        const connection = await getConnection();
        if(nombre === undefined){
            const resultado = await connection.query("SELECT * FROM tiposactivos WHERE NombreActivo REGEXP LOWER('')");
            res.status(200).send({tipoactivo: resultado});
        }else{
            const resultado = await connection.query("SELECT * FROM tiposactivos WHERE NombreActivo REGEXP LOWER('"+nombre+"')");
            res.status(200).send({tipoactivo: resultado});
        }
    }catch(error){
        res.status(500).send(error.message);
    }  
};