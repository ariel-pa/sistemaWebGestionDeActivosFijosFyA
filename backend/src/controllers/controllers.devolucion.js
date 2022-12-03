import {getConnection} from "../database/database";
import qrcode from "qrcode";
export async function postAltaDevolucion(req, res){
    try{
        const data = req.body;
        // console.log(data);
        const connection = await getConnection();
        await connection.query("CALL PA_DevolucionActivosFijos(?, ?, ?, ?)",[data.CodActivo, data.CodCondicion, data.Motivo, data.Observaciones], async (err, devolucion_save)=>{
            if(devolucion_save){
                res.status(200).send({
                    message: 'Devolución de activo exitosa',
                    altaactivo: devolucion_save
                });
            }else{
                res.status(403).send({error: 'No se logro dar la devolución del activo fijo'});
            }
        });

    }catch(error){
        res.status(500).send(error.message);
    }  
};


export async function getDevolucionNombre(req, res){
    try{
        const nombre = req.params['nombre'];
        // console.log(nombre);
        const connection = await getConnection();
        if(nombre === undefined){
            await connection.query("SELECT dev.Motivo, em.Nombres, ac.Imagen, em.Apellidos, ac.Descripcion as ActivoFijo, ac.idActivo as Codigo, con.Nombre as Condicion, dev.Observaciones, dev.FechaDevolucion ,pro.NombrePro FROM devoluciones dev INNER JOIN empleados em ON em.idEmpleado=dev.CodEmpleado INNER JOIN condiciones con ON con.idCondicion=dev.idCondici INNER JOIN activos ac ON ac.idActivo = dev.CodActivo INNER JOIN proyectos pro ON pro.idProyecto=dev.Proyecto WHERE ac.idActivo REGEXP LOWER('') OR ac.Descripcion REGEXP LOWER('') OR em.Nombres REGEXP LOWER('') OR pro.NombrePro REGEXP LOWER('')order by dev.idDevolucion DESC",(err, devolucion_list)=>{
                if(devolucion_list.length){
                    res.status(200).send({devolucion: devolucion_list});
                }else{
                    res.status(403).send({message: 'No hay ningun registro de devolución'});
                }
            });
            
        }else{
            await connection.query("SELECT dev.Motivo, em.Nombres, ac.Imagen, em.Apellidos, ac.Descripcion as ActivoFijo, ac.idActivo as Codigo, con.Nombre as Condicion, dev.Observaciones, dev.FechaDevolucion, pro.NombrePro FROM devoluciones dev INNER JOIN empleados em ON em.idEmpleado=dev.CodEmpleado INNER JOIN condiciones con ON con.idCondicion=dev.idCondici INNER JOIN activos ac ON ac.idActivo = dev.CodActivo INNER JOIN proyectos pro ON pro.idProyecto=dev.Proyecto WHERE ac.idActivo REGEXP LOWER('"+nombre+"') OR ac.Descripcion REGEXP LOWER('"+nombre+"') OR em.Nombres REGEXP LOWER('"+nombre+"') OR pro.NombrePro REGEXP LOWER('"+nombre+"')order by dev.idDevolucion DESC",(err, devolucion_list)=>{
                if(devolucion_list.length){
                    res.status(200).send({devolucion: devolucion_list});                    
                }else{
                    res.status(403).send({message: 'No hay ningun registro de devolución'});

                }
            });
            
        }
    }catch(error){
        res.status(500).send(error.message);
    }  
};
