import {getConnection} from "../database/database";
import qrcode from "qrcode";
export async function postBajaActivo(req, res){
    try{
        const data = req.body;
        // console.log(data);
        const connection = await getConnection();
        await connection.query("CALL PA_BajaActivosFijos(?, ?)",[data.CodActivo, data.Motivo], async (err, baja_save)=>{
            if(baja_save){
                res.status(200).send({
                    message: 'Baja de activo fijo exitosa',
                    bajaactivo: baja_save
                });
            }else{
                res.status(403).send({error: 'No se logro de baja el activo fijo'});
            }
        });

    }catch(error){
        res.status(500).send(error.message);
    }  
};


export async function getBajaNombre(req, res){
    try{
        const nombre = req.params['nombre'];
        // console.log(nombre);
        const connection = await getConnection();
        if(nombre === undefined){
            await connection.query("SELECT ac.idActivo as Codigo, ac.Imagen, tip.NombreActivo as TipoActivoFijo , con.Nombre, ac.Descripcion, ba.FechaBaja as Fecha, ba.Motivo FROM bajas ba INNER JOIN activos ac ON ac.idActivo = ba.idActi INNER JOIN  tiposactivos tip ON tip.idTipo=ac.idTipo INNER JOIN condiciones con ON con.idCondicion = ac.idCondicion WHERE ac.idActivo REGEXP LOWER('') OR tip.NombreActivo REGEXP LOWER('') OR ac.Descripcion REGEXP LOWER('') order by ba.idBaja DESC",(err, baja_list)=>{
                if(baja_list.length){
                    res.status(200).send({baja: baja_list});
                }else{
                    res.status(403).send({message: 'No hay ningun registro de activos fijos dados de baja'});
                }
            });
            
        }else{
            await connection.query("SELECT ac.idActivo as Codigo, ac.Imagen, tip.NombreActivo as TipoActivoFijo , con.Nombre, ac.Descripcion, ba.FechaBaja as Fecha, ba.Motivo FROM bajas ba INNER JOIN activos ac ON ac.idActivo = ba.idActi INNER JOIN  tiposactivos tip ON tip.idTipo=ac.idTipo INNER JOIN condiciones con ON con.idCondicion = ac.idCondicion WHERE ac.idActivo REGEXP LOWER('"+nombre+"') OR tip.NombreActivo REGEXP LOWER('"+nombre+"') OR ac.Descripcion REGEXP LOWER('"+nombre+"') order by ba.idBaja DESC",(err, baja_list)=>{
                if(baja_list.length){
                    res.status(200).send({baja: baja_list});                    
                }else{
                    res.status(403).send({message: 'No hay ningun registro de activos fijos dados de baja'});

                }
            });
            
        }
    }catch(error){
        res.status(500).send(error.message);
    }  
};
