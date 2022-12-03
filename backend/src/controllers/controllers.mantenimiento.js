import {getConnection} from "../database/database";

export async function postMantenimiento(req, res){
    try{
        const data = req.body;
        // console.log(data);
        const connection = await getConnection();
        await connection.query("CALL PA_MantenimientoActivosFijos(?, ?, ?, ?)",[data.FechaMant, data.Informe, data.Costo, data.idAct], async (err, mantenimiento_save)=>{
            if(mantenimiento_save){
                res.status(200).send({
                    message: 'Activo fijo en mantenimiento',
                    mantenimiento: mantenimiento_save
                });
            }else{
                res.status(403).send({error: 'No se logro realizar el mantenimineto'});
            }
        });

    }catch(error){
        res.status(500).send(error.message);
    }  
};


export async function getMantenimiento(req, res){
    try{
        const nombre = req.params['nombre'];
        // console.log(nombre);
        const connection = await getConnection();
        if(nombre === undefined){
            await connection.query("SELECT * FROM mantenimiento mant INNER JOIN activos ac ON ac.idActivo=mant.idAct INNER JOIN tiposactivos tip ON tip.idTipo =ac.idTipo WHERE mant.idAct REGEXP LOWER('') OR tip.NombreActivo REGEXP LOWER('')order by mant.idMant DESC",(err, mantenimiento_list)=>{
                if(mantenimiento_list.length){
                    res.status(200).send({mantenimiento: mantenimiento_list});
                }else{
                    res.status(403).send({message: 'No hay ningun registro en mantenimiento'});
                }
            });
            
        }else{
            await connection.query("SELECT * FROM mantenimiento mant INNER JOIN activos ac ON ac.idActivo=mant.idAct INNER JOIN tiposactivos tip ON tip.idTipo =ac.idTipo WHERE mant.idAct REGEXP LOWER('"+nombre+"') OR tip.NombreActivo REGEXP LOWER('"+nombre+"')order by mant.idMant DESC",(err,mantenimiento_list)=>{
                if(mantenimiento_list.length){
                    res.status(200).send({mantenimiento: mantenimiento_list});                    
                }else{
                    res.status(403).send({message: 'No hay ningun registro en mantenimiento'});

                }
            });
            
        }
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function deleteMantenimiento(req, res){
    try{
        const id = req.params.id;
        
        const connection = await getConnection();
        const EstadoMant = await connection.query("SELECT Estado,idAct FROM mantenimiento WHERE idMant = ?", id);
        
        const Activo = {
            Estado: EstadoMant[0].Estado
        };
        await connection.query("UPDATE activos SET ? WHERE idActivo= ?",[Activo, EstadoMant[0].idAct]);
        
        await connection.query("DELETE FROM mantenimiento WHERE idMant= ?", id,(err, mantenimiento_delete)=>{
            if(mantenimiento_delete.affectedRows){
                res.status(200).send({mantenimiento: mantenimiento_delete});
            }else{
                res.status(403).send({message: 'No se elimino el registro'});
            }
        });
        
    }catch(error){
        res.status(500).send(error.message);
    }  
};
