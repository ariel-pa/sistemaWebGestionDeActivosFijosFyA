import {getConnection} from "./../database/database";

export async function postAmbiente(req, res){
    try{
        const data = req.body;
        // console.log(data);
        const ambiente = {
            NombreAmb: data.NombreAmb,
            DescripcionAmb: data.DescripcionAmb,
            idEdificio: data.idEdificio
        }
        // console.log(rubro);
        const connection = await getConnection();
        await connection.query("INSERT INTO ambientes SET ?", ambiente);
        res.status(200).send({ambiente: ambiente});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getAmbientes(req, res){
    try{
        const connection = await getConnection();
        const resultado = await connection.query("SELECT * FROM ambientes");
        res.status(200).send({ambiente: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
}; 

export async function getAmbienteById(req, res){
    try{
        const id = req.params.id;
        // console.log(id);
        const connection = await getConnection();
        const resultado = await connection.query("SELECT * FROM ambientes WHERE idAmbiente = ?", id);
        res.status(200).send({ambiente: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function putAmbiente(req, res){
    try{
        const id = req.params.id;
        const data = req.body; 
        
        const ambiente = {
            NombreAmb: data.NombreAmb,
            DescripcionAmb: data.DescripcionAmb,
            idEdificio: data.idEdificio
        }
        const connection = await getConnection();
        const resultado = await connection.query("UPDATE ambientes SET ? WHERE idAmbiente= ?", [ambiente, id]);
        res.status(200).send({ambiente: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function deleteAmbiente(req, res){
    try{
        const id = req.params.id;

        const connection = await getConnection();
        const resultado = await connection.query("DELETE FROM ambientes WHERE idAmbiente= ?", id);
        res.status(200).send({ambiente: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getAmbienteName(req, res){
    try{
        const nombre = req.params['nombre'];
        // console.log(nombre);
        const connection = await getConnection();
        if(nombre === undefined){
            await connection.query("SELECT * FROM ambientes am INNER JOIN edificios ed ON am.idEdificio=ed.idEdificio WHERE am.NombreAmb REGEXP LOWER('')",(err, ambiente_list)=>{
                if(ambiente_list.length){
                    res.status(200).send({ambientes: ambiente_list});        
                }else{
                    res.status(403).send({message: 'No hay ningun registro'});
                }
            });
            
        }else{
            await connection.query("SELECT * FROM ambientes am INNER JOIN edificios ed ON am.idEdificio=ed.idEdificio  WHERE am.NombreAmb REGEXP LOWER('"+nombre+"')", (err,ambiente_list)=>{
                if(ambiente_list.length){
                    res.status(200).send({ambientes: ambiente_list});
                }else{
                    res.status(403).send({message: 'No hay ningun registro'});
                }
            });
            
        }
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getEdificioAmbienteById(req, res){
    try{
        const id = req.params.id;
        // console.log(id);
        const connection = await getConnection();
        const resultado = await connection.query("SELECT * FROM ambientes WHERE idEdificio = ?", id);
        res.status(200).send({ambientes: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};