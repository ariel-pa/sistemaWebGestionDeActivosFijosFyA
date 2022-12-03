import {getConnection} from "./../database/database";

export async function postCondicion(req, res){
    try{
        const data = req.body;
        // console.log(data);
        const condicion = {
            Nombre: data.Nombre
        }
        // console.log(rubro);
        const connection = await getConnection();
        await connection.query("INSERT INTO condiciones SET ?", condicion);
        res.status(200).send({condicion: condicion});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getCondiciones(req, res){
    try{
        const connection = await getConnection();
        const resultado = await connection.query("SELECT * FROM condiciones");
        res.status(200).send({condiciones: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getCondicionById(req, res){
    try{
        const id = req.params.id;
        // console.log(id);
        const connection = await getConnection();
        const resultado = await connection.query("SELECT * FROM condiciones WHERE idCondicion = ?", id);
        res.status(200).send({condicion: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function putCondicion(req, res){
    try{
        const id = req.params.id;
        const data = req.body; 
        
        const condicion = {
            Nombre: data.Nombre
        }
        const connection = await getConnection();
        const resultado = await connection.query("UPDATE condiciones SET ? WHERE idCondicion= ?", [condicion, id]);
        res.status(200).send({condicion: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function deleteCondicion(req, res){
    try{
        const id = req.params.id;

        const connection = await getConnection();
        const resultado = await connection.query("DELETE FROM condiciones  WHERE idCondicion= ?", id);
        res.status(200).send({condicion: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getCondicionName(req, res){
    try{
        const nombre = req.params['nombre'];
        // console.log(nombre);
        const connection = await getConnection();
        if(nombre === undefined){
            const resultado = await connection.query("SELECT * FROM condiciones WHERE Nombre REGEXP LOWER('')");
            res.status(200).send({condicion: resultado});
        }else{
            const resultado = await connection.query("SELECT * FROM condiciones WHERE Nombre REGEXP LOWER('"+nombre+"')");
            res.status(200).send({condicion: resultado});
        }
    }catch(error){
        res.status(500).send(error.message);
    }  
};