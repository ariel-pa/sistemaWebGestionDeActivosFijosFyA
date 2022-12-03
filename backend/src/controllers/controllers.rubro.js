import {getConnection} from "./../database/database";

export async function postRubro(req, res){
    try{
        const data = req.body;
        // console.log(data);
        const rubro = {
            Nombre: data.Nombre,
            VidaUtil: data.VidaUtil,
            Depreciable: data.Depreciable,
            CoeficienteD: data.CoeficienteD/100,
            Actualiza: data.Actualiza
        }
        // console.log(rubro);
        const connection = await getConnection();
        await connection.query("INSERT INTO rubros SET ?", rubro);
        res.status(200).send({rubro: rubro});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getRubros(req, res){
    try{
        const connection = await getConnection();
        const resultado = await connection.query("SELECT * FROM rubros");
        res.status(200).send({rubros: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getRubroById(req, res){
    try{
        const id = req.params.id;
        // console.log(id);
        const connection = await getConnection();
        const resultado = await connection.query("SELECT * FROM rubros WHERE idRubro = ?", id);
        res.status(200).send({rubro: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function putRubro(req, res){
    try{
        const id = req.params.id;
        const data = req.body; 
        // console.log(id);
        // console.log(data);
        const rubro = {
            Nombre: data.Nombre,
            VidaUtil: data.VidaUtil,
            Depreciable: data.Depreciable,
            CoeficienteD: data.CoeficienteD,
            Actualiza: data.Actualiza
        }
        const connection = await getConnection();
        const resultado = await connection.query("UPDATE rubros SET ? WHERE idRubro= ?", [rubro, id]);
        res.status(200).send({rubro: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function deleteRubro(req, res){
    try{
        const id = req.params.id;

        const connection = await getConnection();
        const resultado = await connection.query("DELETE FROM rubros  WHERE idRubro= ?", id);
        res.status(200).send({rubro: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getRubroName(req, res){
    try{
        const nombre = req.params['nombre'];
        // console.log(nombre);
        const connection = await getConnection();
        if(nombre === undefined){
            const resultado = await connection.query("SELECT * FROM rubros WHERE Nombre REGEXP LOWER('')");
            res.status(200).send({rubro: resultado});
        }else{
            const resultado = await connection.query("SELECT * FROM rubros WHERE Nombre REGEXP LOWER('"+nombre+"')");
            res.status(200).send({rubro: resultado});
        }
    }catch(error){
        res.status(500).send(error.message);
    }  
};