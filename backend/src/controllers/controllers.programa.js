import {getConnection} from "./../database/database";

export async function postPrograma(req, res){
    try{
        const data = req.body;
        // console.log(data);
        const programa = {
            NombreProg: data.NombreProg
        }
        // console.log(rubro);
        const connection = await getConnection();
        await connection.query("INSERT INTO programas SET ?", programa);
        res.status(200).send({programa: programa});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getProgramas(req, res){
    try{
        const connection = await getConnection();
        const resultado = await connection.query("SELECT * FROM programas");
        res.status(200).send({programas: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getProgramaById(req, res){
    try{
        const id = req.params.id;
        // console.log(id);
        const connection = await getConnection();
        const resultado = await connection.query("SELECT * FROM programas WHERE idPrograma = ?", id);
        res.status(200).send({programa: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function putPrograma(req, res){
    try{
        const id = req.params.id;
        const data = req.body; 
        
        const programa = {
            NombreProg: data.NombreProg
        }
        const connection = await getConnection();
        const resultado = await connection.query("UPDATE programas SET ? WHERE idPrograma= ?", [programa, id]);
        res.status(200).send({programa: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function deletePrograma(req, res){
    try{
        const id = req.params.id;

        const connection = await getConnection();
        const resultado = await connection.query("DELETE FROM programas WHERE idPrograma= ?", id);
        res.status(200).send({programa: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getProgramaName(req, res){
    try{
        const nombre = req.params['nombre'];
        // console.log(nombre);
        const connection = await getConnection();
        if(nombre === undefined){
            const resultado = await connection.query("SELECT * FROM programas WHERE NombreProg REGEXP LOWER('')");
            res.status(200).send({programa: resultado});
        }else{
            const resultado = await connection.query("SELECT * FROM programas WHERE NombreProg REGEXP LOWER('"+nombre+"')");
            res.status(200).send({programa: resultado});
        }
    }catch(error){
        res.status(500).send(error.message);
    }  
};