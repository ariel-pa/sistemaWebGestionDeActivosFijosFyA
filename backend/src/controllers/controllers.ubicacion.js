import {getConnection} from "./../database/database";

export async function postUbicacion(req, res){
    try{
        const data = req.body;
        // console.log(data);
        const ubicacion = {
            NombreLugar: data.NombreLugar
        }
        // console.log(rubro);
        const connection = await getConnection();
        await connection.query("INSERT INTO ubicaciones SET ?", ubicacion);
        res.status(200).send({ubicacion: ubicacion});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getUbicaciones(req, res){
    try{
        const connection = await getConnection();
        const resultado = await connection.query("SELECT * FROM ubicaciones");
        res.status(200).send({ubicaciones: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getUbicacionById(req, res){
    try{
        const id = req.params.id;
        // console.log(id);
        const connection = await getConnection();
        const resultado = await connection.query("SELECT * FROM ubicaciones WHERE idUbicacion = ?", id);
        res.status(200).send({ubicacion: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function putUbicacion(req, res){
    try{
        const id = req.params.id;
        const data = req.body; 
        
        const ubicacion = {
            NombreLugar: data.NombreLugar
        }
        const connection = await getConnection();
        const resultado = await connection.query("UPDATE ubicaciones SET ? WHERE idUbicacion= ?", [ubicacion, id]);
        res.status(200).send({ubicacion: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function deleteUbicacion(req, res){
    try{
        const id = req.params.id;

        const connection = await getConnection();
        const resultado = await connection.query("DELETE FROM ubicaciones  WHERE idUbicacion= ?", id);
        res.status(200).send({ubicacion: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getUbicacionName(req, res){
    try{
        const nombre = req.params['nombre'];
        // console.log(nombre);
        const connection = await getConnection();
        if(nombre === undefined){
            const resultado = await connection.query("SELECT * FROM ubicaciones WHERE NombreLugar REGEXP LOWER('') OR idUbicacion REGEXP LOWER('')");
            res.status(200).send({ubicacion: resultado});
        }else{
            const resultado = await connection.query("SELECT * FROM ubicaciones WHERE NombreLugar REGEXP LOWER('"+nombre+"') OR idUbicacion REGEXP LOWER('"+nombre+"')");
            res.status(200).send({ubicacion: resultado});
        }
    }catch(error){
        res.status(500).send(error.message);
    }  
};