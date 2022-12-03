import {getConnection} from "./../database/database";

export async function postEdificio(req, res){
    try{
        const data = req.body;
        // console.log(data);
        const edificio = {
            NombreEdi: data.NombreEdi,
            Servicio: data.Servicio,
            Direccion: data.Direccion,
            Latitud: data.Latitud,
            Longitud: data.Longitud,
            idUbicacion: data.idUbicacion
        }
        // console.log(rubro);
        const connection = await getConnection();
        await connection.query("INSERT INTO edificios SET ?",edificio);
        res.status(200).send({edificio: edificio});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getEdificios(req, res){
    try{
        const connection = await getConnection();
        const resultado = await connection.query("SELECT * FROM edificios");
        res.status(200).send({edificios: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getEdificioById(req, res){
    try{
        const id = req.params.id;
        // console.log(id);
        const connection = await getConnection();
        await connection.query("SELECT * FROM edificios WHERE idEdificio = ?", id, (err, edificio_list)=>{
            if(edificio_list[0] ){
                res.status(200).send({edificio: edificio_list});
            }else{
                res.status(403).send({message: 'No existe el registro'});
            }
        });
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function putEdificio(req, res){
    try{
        const id = req.params.id;
        const data = req.body; 
        
        const edificio = {
            NombreEdi: data.NombreEdi,
            Servicio: data.Servicio,
            Direccion: data.Direccion,
            idUbicacion: data.idUbicacion
        }
        const connection = await getConnection();
        const resultado = await connection.query("UPDATE edificios SET ? WHERE idEdificio= ?", [edificio, id]);
        res.status(200).send({edificio: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function deleteEdificio(req, res){
    try{
        const id = req.params.id;

        const connection = await getConnection();
        const resultado = await connection.query("DELETE FROM edificios WHERE idEdificio= ?", id);
        res.status(200).send({edificio: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getEdificioName(req, res){
    try{
        const nombre = req.params['nombre'];
        // console.log(nombre);
        const connection = await getConnection();
        if(nombre === undefined){
            await connection.query("SELECT * FROM edificios ed INNER JOIN ubicaciones ub ON ed.idUbicacion = ub.idUbicacion WHERE ed.NombreEdi REGEXP LOWER('')", (err, edificio_list)=>{
                if(err){
                    res.status(500).send({message: 'Error en el servidor'})
                }else{
                    if(edificio_list.length){
                        res.status(200).send({edificios: edificio_list});
                    }else{
                         res.status(403).send({message: 'No hay ningun registro con ese nombre'});
                    }
                }
            });
            
        }else{
            await connection.query("SELECT * FROM edificios WHERE NombreEdi REGEXP LOWER('"+nombre+"')",(err,edificio_list)=>{
                if(edificio_list.length){
                    res.status(200).send({edificios: edificio_list});
                }else{
                    res.status(403).send({message: 'No hay ningun registro con ese nombre'});
                }
            });
            
        }
    }catch(error){
        res.status(500).send(error.message);
    }  
};