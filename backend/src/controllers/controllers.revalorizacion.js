import {getConnection} from "../database/database";

export async function postRevalorizacionActivo(req, res){
    try{
        const data = req.body;
        console.log(data);
        const connection = await getConnection();
        await connection.query("CALL PA_RevalorizacionActivosFijos(?,?,?,?)",[data.CodActivo, data.Valor, data.Descripcion, data.FechaRevalorizacion], async (err, revalorizacion_save)=>{
            if(revalorizacion_save){
                res.status(200).send({
                    message: 'Revalorizacion de activo fijo exitosa',
                    bajaactivo: revalorizacion_save
                });
            }else{
                res.status(403).send({error: 'No se logro revalorizar el activo fijo'});
            }
        });

    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getDatosDepreciacionById(req, res){
    try{
        const id = req.params.id;//id =idAmbiente
        // console.log(id);
        const connection = await getConnection();
        await connection.query("SELECT * FROM activos ac INNER JOIN tiposactivos tip  ON tip.idTipo=ac.idTipo WHERE ac.idActivo = ? ", id, async (err, data_depreciacion)=>{
            if(data_depreciacion){
                await connection.query("SELECT * FROM activos ac INNER JOIN depreciaciones dep ON dep.idActivo =ac.idActivo WHERE dep.idActivo = ?", id,(err, detalle_depreciacion)=>{
                    if(detalle_depreciacion){
                        res.status(200).send({
                            activofijo: data_depreciacion,
                            depreciacion: detalle_depreciacion,
                        });     
                    }else{
                        res.status(404).send({message: "No hay depreciaciones del activo fijo"});
                    }
                });
            }else{
                res.status(404).send({message: "No hay ningun registro"});
            }
        });
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getActivosRevalorizacionCodigo(req, res){
    try{
        const nombre = req.params['nombre'];
        // console.log(nombre);
        const connection = await getConnection();
        if(nombre === undefined){
            await connection.query("SELECT * FROM activos ac INNER JOIN tiposactivos tip ON ac.idTipo=tip.idTipo INNER JOIN revalorizaciones rev ON rev.CodActivo=ac.idActivo WHERE ac.idActivo REGEXP LOWER('') OR tip.NombreActivo REGEXP LOWER('') order by rev.idRevalorizacion DESC",(err, activo_list)=>{
                if(activo_list.length){
                    res.status(200).send({activos: activo_list});
                }else{
                    res.status(403).send({message: 'No hay ningun registro con el codigo o nombre del tipo de activo fijo'});
                }
            });
            
        }else{
            await connection.query("SELECT * FROM activos ac INNER JOIN tiposactivos tip ON ac.idTipo=tip.idTipo INNER JOIN revalorizaciones rev ON rev.CodActivo=ac.idActivo WHERE ac.idActivo REGEXP LOWER('"+nombre+"') OR tip.NombreActivo REGEXP LOWER('"+nombre+"') order by rev.idRevalorizacion DESC",(err, activo_list)=>{
                if(activo_list.length){
                    res.status(200).send({activos: activo_list});                    
                }else{
                    res.status(403).send({message: 'No hay ningun registro con el codigo o nombre del tipo de activo fijo'});
                }
            });
            
        }
    }catch(error){
        res.status(500).send(error.message);
    }  
};

// export async function getEmpleadoAltaActivo(req, res){
//     try{
//         const connection = await getConnection();
//         // await connection.query("SELECT distinct em.idEmpleado, Nombres, Apellidos, Cargo, Telefono  FROM altaactivos al INNER JOIN empleados em  ON em.idEmpleado=al.idEmpleado", (err, data_empleados)=>{
//         await connection.query("SELECT  distinct(al.idAmbiente),em.idEmpleado, em.Nombres, em.Apellidos, em.Cargo, em.Telefono, am.NombreAmb, ed.NombreEdi FROM altaactivos al INNER JOIN empleados em  ON em.idEmpleado=al.idEmpleado INNER JOIN ambientes am ON am.idAmbiente=al.idAmbiente INNER JOIN edificios ed ON ed.idEdificio=am.idEdificio", (err, data_empleados)=>{
//         if(data_empleados){
//                 res.status(200).send({empleadosalta: data_empleados});
//             }else{
//                 res.status(404).send({message: "No hay ningun registro de empleados alta de acivos fijos"});
//             }
//         });
//     }catch(error){
//         res.status(500).send(error.message);
//     }  
// };