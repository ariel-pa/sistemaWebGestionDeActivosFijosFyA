import {getConnection} from "../database/database";

export async function getHistorialActivosFijos(req, res){
    try{
        const nombre = req.params['nombre'];
        const connection = await getConnection();
        if(nombre === undefined){
            await connection.query("SELECT * FROM historialactivofijo his INNER JOIN activos ac ON ac.idActivo = his.CodActivo INNER JOIN empleados em ON em.idEmpleado = his.CodEmpleado INNER JOIN proyectos pro ON pro.idProyecto = his.CodProyecto INNER JOIN ambientes am ON am.idAmbiente = his.CodAmbiente INNER JOIN edificios ed ON ed.idEdificio = am.idEdificio WHERE em.Nombres REGEXP LOWER('') OR ac.Descripcion REGEXP LOWER('') order by his.CodActivo",(err, historial_activo)=>{
                if(historial_activo.length){
                    res.status(200).send({activos: historial_activo});
                }else{
                    res.status(403).send({message: 'No hay historial'});
                }
            });
            
        }else{
            await connection.query("SELECT * FROM historialactivofijo his INNER JOIN activos ac ON ac.idActivo = his.CodActivo INNER JOIN empleados em ON em.idEmpleado = his.CodEmpleado INNER JOIN proyectos pro ON pro.idProyecto = his.CodProyecto INNER JOIN ambientes am ON am.idAmbiente = his.CodAmbiente INNER JOIN edificios ed ON ed.idEdificio = am.idEdificio WHERE pro.NombrePro REGEXP LOWER('"+nombre+"') OR em.Nombres REGEXP LOWER('"+nombre+"') OR ac.Descripcion REGEXP LOWER('"+nombre+"') order by ac.idActivo",(err, historial_activo)=>{
                if(historial_activo.length){
                    res.status(200).send({activos: historial_activo});                    
                }else{
                    res.status(403).send({message: 'No hay historial'});
                }
            });
        }
    }catch(error){
        res.status(500).send(error.message);
    }
}

export async function getHistorialActivosFijosCod(req, res){
    try{
        const nombre = req.params['nombre'];
        const connection = await getConnection();
        if(nombre === undefined){
            await connection.query("SELECT * FROM historialactivofijo his INNER JOIN activos ac ON ac.idActivo = his.CodActivo INNER JOIN empleados em ON em.idEmpleado = his.CodEmpleado INNER JOIN proyectos pro ON pro.idProyecto = his.CodProyecto INNER JOIN ambientes am ON am.idAmbiente = his.CodAmbiente INNER JOIN edificios ed ON ed.idEdificio = am.idEdificio",(err, historial_activo)=>{
                if(historial_activo.length){
                    res.status(200).send({activos: historial_activo});
                }else{
                    res.status(403).send({message: 'No hay historial'});
                }
            });
            
        }else{
            await connection.query(`SELECT * FROM historialactivofijo his INNER JOIN activos ac ON ac.idActivo = his.CodActivo INNER JOIN empleados em ON em.idEmpleado = his.CodEmpleado INNER JOIN proyectos pro ON pro.idProyecto = his.CodProyecto INNER JOIN ambientes am ON am.idAmbiente = his.CodAmbiente INNER JOIN edificios ed ON ed.idEdificio = am.idEdificio WHERE his.CodActivo = ${nombre}`,(err, historial_activo)=>{
                if(historial_activo.length){
                    res.status(200).send({activos: historial_activo});                    
                }else{
                    res.status(403).send({message: 'No hay historial'});
                }
            });
        }
    }catch(error){
        res.status(500).send(error.message);
    }
}

export async function getHistorialDepreciaciones(req, res){
    try{
        const nombre = req.params['nombre'];

        const connection = await getConnection();
        if(nombre === undefined){
            await connection.query("SELECT * FROM activos ac INNER JOIN tiposactivos tip  ON tip.idTipo=ac.idTipo INNER JOIN depreciaciones dep ON ac.idActivo=dep.idActivo WHERE dep.idActivo REGEXP LOWER('') OR ac.Descripcion REGEXP LOWER('') OR tip.NombreActivo REGEXP LOWER('') order by dep.idActivo",(err, historial_dep)=>{
                if(historial_dep.length){
                    res.status(200).send({depreciaciones: historial_dep});
                }else{
                    res.status(403).send({message: 'No hay historial'});
                }
            });
            
        }else{
            await connection.query("SELECT * FROM activos ac INNER JOIN tiposactivos tip  ON tip.idTipo=ac.idTipo INNER JOIN depreciaciones dep ON ac.idActivo=dep.idActivo WHERE dep.idActivo REGEXP LOWER('"+nombre+"') OR ac.Descripcion REGEXP LOWER('"+nombre+"') OR tip.NombreActivo REGEXP LOWER('"+nombre+"') order by dep.idActivo",(err, historial_dep)=>{
                if(historial_dep.length){
                    res.status(200).send({depreciaciones: historial_dep});                    
                }else{
                    res.status(403).send({message: 'No hay historial'});
                }
            });
        }
    }catch(error){
        res.status(500).send(error.message);
    }
}



// export async function getCantidadMantenimiento(req, res){
//     try{

//         const connection = await getConnection();
//         await connection.query("select count(*) as Mantenimiento from Mantenimiento",(err, mantenimiento)=>{
//             if(mantenimiento){
//                 res.status(200).send({mantenimiento: mantenimiento});
//             }else{
//                 res.status(403).send({message: 'No hay registro de activos fijos en mantenimiento'});
//             }
//         });
//     }catch(error){
//         res.status(500).send(error.message);
//     }  
// };

// export async function getCantidadDisponible(req, res){
//     try{

//         const connection = await getConnection();
//         await connection.query("select count(*) as Disponibles from activos where Estado='Activo'",(err, disponible)=>{
//             if(disponible){
//                 res.status(200).send({disponible: disponible});
//             }else{
//                 res.status(403).send({message: 'No hay registro de activos fijos disponibles'});
//             }
//         });
//     }catch(error){
//         res.status(500).send(error.message);
//     }  
// };

