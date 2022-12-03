import {getConnection} from "./../database/database";
var fs = require('fs');
var path = require('path');//obtener imagen

export async function postActivo(req, res){
    try{
        const data = req.body;
        // console.log(data);
        // console.log(req);
        if(req.files){
            const imagen_path = req.files.Imagen.path; //asignar la ruta donde esta la imagen
            const name = imagen_path.split('\\');//split crea un array y separa el nombre de la imagen
            const imagen_name = name[2];//obtiene el nombre de la imagen en el indice 2

            const factura_path = req.files.Factura.path; 
            const factura = factura_path.split('\\');
            const factura_name = factura[2];
            // console.log(imagen_name);  
            const activo = {
                idTipo: data.idTipo,
                Imagen: imagen_name,
                Factura: factura_name,
                Garantia: data.Garantia,
                Procedencia: data.Procedencia,
                Descripcion: data.Descripcion,
                ValorRegistro: data.ValorRegistro,
                Observaciones: data.Observaciones,
                UfvInicial: data.UfvInicial,
                idCondicion: data.idCondicion,
                idRubro: data.idRubro,
                idProveedor: data.idProveedor
            }
            // console.log(activo);
            const connection = await getConnection();
            await connection.query("INSERT INTO activos SET ?", activo, (err, activo_save)=>{
                if(activo_save){
                    res.status(200).send({activo: activo});
                }else{
                    res.status(403).send({message: 'No se registro el activo fijo'});
                }
            });
        }else{
            const activo = {
                idTipo: data.idTipo,
                Imagen: null,
                Factura: null,
                Garantia: data.Garantia,
                Procedencia: data.Procedencia,
                Descripcion: data.Descripcion,
                ValorRegistro: data.ValorRegistro,
                Observaciones: data.Observaciones,
                UfvInicial: data.UfvInicial,
                idCondicion: data.idCondicion,
                idRubro: data.idRubro,
                idProveedor: data.idProveedor,
            }
            // console.log(activo);
            const connection = await getConnection();
            await connection.query("INSERT INTO activos SET ?", activo,(err, activo_save)=>{
                if(activo_save){
                    res.status(200).send({activo: activo});
                }else{
                    res.status(403).send({message: 'No se registro el activo fijo'});
                }
            });
        }
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getActivoCodigo(req, res){
    try{
        const nombre = req.params['nombre'];
        // console.log(nombre);
        const connection = await getConnection();
        if(nombre === undefined){
            await connection.query("SELECT * FROM activos ac INNER JOIN tiposactivos tip ON ac.idTipo=tip.idTipo INNER JOIN proveedores pro ON pro.idProveedor=ac.idProveedor INNER JOIN condiciones cond ON cond.idCondicion=ac.idCondicion WHERE ac.Estado<>'Baja' AND (ac.idActivo REGEXP LOWER('') OR tip.NombreActivo REGEXP LOWER('')) order by ac.idActivo DESC",(err, activo_list)=>{
                if(activo_list.length){
                    res.status(200).send({activos: activo_list});
                }else{
                    res.status(403).send({message: 'No hay ningun registro con el codigo o nombre del tipo de activo fijo'});
                }
            });
            
        }else{
            await connection.query("SELECT * FROM activos ac INNER JOIN tiposactivos tip ON ac.idTipo=tip.idTipo INNER JOIN proveedores pro ON pro.idProveedor=ac.idProveedor INNER JOIN condiciones cond ON cond.idCondicion=ac.idCondicion WHERE ac.Estado<>'Baja' AND (ac.idActivo REGEXP LOWER('"+nombre+"') OR tip.NombreActivo REGEXP LOWER('"+nombre+"')) order by ac.idActivo DESC",(err, activo_list)=>{
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

// export async function getActivos(req, res){
//     try{
//         const connection = await getConnection();
//         const resultado = await connection.query("SELECT * FROM activos");
//         res.status(200).send({activos: resultado});
//     }catch(error){
//         res.status(500).send(error.message);
//     }  
// };


export async function putActivo(req, res){
    try{
        const id = req.params.id;
        const data = req.body; 
        var img = req.params['img'];
        // var fac = req.params['fac'];
        // console.log(img,"__",fac);
        if(req.files.Imagen){

            if(img || img != null || img !=undefined){
                fs.unlink('./uploads/activos/'+img, (err)=>{
                    if(err) throw err;
                });//eliminar la imagen
            }   

            // if(fac || fac != null || fac !=undefined){
            //     fs.unlink('./uploads/activos/'+fac, (err)=>{
            //         if(err) throw err;
            //     });//eliminar la imagen
            // }   

            const imagen_path = req.files.Imagen.path; //asignar la ruta donde esta la imagen
            const name = imagen_path.split('\\');//split crea un array y separa el nombre de la imagen
            const imagen_name = name[2];//obtiene el nombre de la imagen en el indice 2
            // console.log(imagen_name);

            // const factura_path = req.files.Factura.path; 
            // const factura = factura_path.split('\\');
            // const factura_name = factura[2];

            const activo = {
                idTipo: data.idTipo,
                Imagen: imagen_name,
                // Factura: factura_name,
                Garantia: data.Garantia,
                Procedencia: data.Procedencia,
                Descripcion: data.Descripcion,
                ValorRegistro: data.ValorRegistro,
                Observaciones: data.Observaciones,
                idCondicion: data.idCondicion,
                idRubro: data.idRubro,
                idProveedor: data.idProveedor
            }
            // console.log(activo);
            const connection = await getConnection();
            await connection.query("UPDATE activos SET ? WHERE idActivo= ?", [activo, id], (err, activo_edit)=>{
                if(activo_edit.affectedRows){
                    res.status(200).send({activo: activo_edit}); 
                }else{
                    res.status(403).send({message: 'No se edito el activo'});
                }
            });
        }else{
            const activo = {
                idTipo: data.idTipo,
                // Imagen: imagen_name,
                // Factura: factura_name,
                Garantia: data.Garantia,
                Procedencia: data.Procedencia,
                Descripcion: data.Descripcion,
                ValorRegistro: data.ValorRegistro,
                Observaciones: data.Observaciones,
                idCondicion: data.idCondicion,
                idRubro: data.idRubro,
                idProveedor: data.idProveedor
            }
            const connection = await getConnection();
            const resultado = await connection.query("UPDATE activos SET ? WHERE idActivo= ?", [activo, id],(err, activo_edit)=>{
                if(err){
                    res.status(500).send({message: 'Error en el servidor'});
                }else{
                    if(activo_edit.affectedRows){
                        res.status(200).send({activo: activo_edit}); 
                    }else{
                        res.status(403).send({message: 'No se edito el activo'});
                    }
                }
            });
        }
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getActivoById(req, res){
    try{
        const id = req.params.id;
        // console.log(id);
        const connection = await getConnection();
        await connection.query("SELECT * FROM activos WHERE idActivo = ?", id,(err, activo_list)=>{
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(activo_list.length){
                    res.status(200).json({activo: activo_list}); 
                }else{
                    res.status(403).send({message: 'No existe el registro'});
                }
            }
        });
        
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function deleteActivo(req, res){
    try{
        const id = req.params.id;

        const connection = await getConnection();
        const img = await connection.query("SELECT Imagen FROM activos WHERE idActivo = ?", id);
        
        fs.unlink('./uploads/activos/'+img[0].Imagen, (err)=>{
            if(err) throw err;
        });//eliminar la imagen

        await connection.query("DELETE FROM activos WHERE idActivo= ?", id,(err, activo_delete)=>{
            if(activo_delete.affectedRows){
                res.status(200).send({activo: activo_delete});
            }else{
                res.status(403).send({message: 'No se elimino el registro'});
            }
        });
        
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export function get_imagen(req, res){
    var img = req.params['img'];

    // console.log(img);    
    if(img != "null"){//ingresamos una imagen
        let path_img = './uploads/activos/'+img;
        res.status(200).sendFile(path.resolve(path_img));
    }else{
        let path_img = './uploads/activos/default.jpg';
        res.status(200).sendFile(path.resolve(path_img));
    }
}

export function get_factura(req, res){
    var img = req.params['img'];

    // console.log(img);    
    if(img != "null"){//ingresamos una imagen
        let path_img = './uploads/activos/'+img;
        res.status(200).sendFile(path.resolve(path_img));
    }else{
        let path_img = './uploads/activos/default.jpg';
        res.status(200).sendFile(path.resolve(path_img));
    }
}


