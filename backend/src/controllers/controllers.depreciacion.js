import {getConnection} from "../database/database";

export async function postDepreciacionActivo(req, res){
    try{
        const data = req.body;
        // console.log(data);
        const connection = await getConnection();
        
        let Valor = await connection.query(`SELECT valor FROM valordepreciacion valDep ORDER BY	valDep.Valor DESC LIMIT 1`);
        
        //Activos depreciables
        const ActivosDepreciables = await connection.query(`SELECT idActivo FROM activos WHERE ValorRegistro >= ${Valor[0].valor}`);

        for (let index = 0; index < ActivosDepreciables.length; index++) {
            let CodActivo = ActivosDepreciables[index].idActivo;
            let UfvIn = await connection.query(`SELECT UfvInicial FROM activos WHERE idActivo = ${CodActivo}`);
            await connection.query("CALL PA_DepreciacionActivosFijos(?,?,?,?)",[CodActivo,data.UfvAct, UfvIn[0].UfvInicial,data.FechaDepreciacion]);
        }
        res.status(200).send({
            message: 'Depreciacion exitosa'
        });     
    }catch(error){
        res.status(500).send(error.message);
    }  
};
// export async function postDepreciacionActivo(req, res){
//     try{
//         const data = req.body;
//         // console.log(data);
//         const connection = await getConnection();
//         await connection.query("CALL PA_DepreciacionActivosFijos(?,?,?,?)",[data.CodActivo, data.UfvAct, data.UfvIn, data.FechaDepreciacion], async (err, depreciacion_save)=>{
//             if(depreciacion_save){
//                 res.status(200).send({
//                     message: 'Depreciacion de activo fijo exitosa',
//                     bajaactivo: depreciacion_save
//                 });
//             }else{
//                 res.status(403).send({error: 'No se logro depreciar el activo fijo'});
//             }
//         });

//     }catch(error){
//         res.status(500).send(error.message);
//     }  
// };

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

export async function getActivosDepreciacionCodigo(req, res){
    try{
        const nombre = req.params['nombre'];
        // console.log(nombre);
        const connection = await getConnection();
        let Valor = await connection.query(`SELECT valor FROM valordepreciacion valDep ORDER BY	valDep.Valor DESC LIMIT 1`);
        // console.log(Valor[0].valor);
        if(nombre === undefined){
            await connection.query(`SELECT * FROM activos ac INNER JOIN tiposactivos tip ON ac.idTipo=tip.idTipo WHERE ac.ufvInicial > 0 AND ac.ValorRegistro >=${Valor[0].valor} AND (ac.idActivo REGEXP LOWER('') OR tip.NombreActivo REGEXP LOWER(''))`,(err, activo_list)=>{
                if(activo_list.length){
                    res.status(200).send({activos: activo_list});
                }else{
                    res.status(403).send({message: 'No hay ningun registro con el codigo o nombre del tipo de activo fijo'});
                }
            });
            
        }else{
            await connection.query(`SELECT * FROM activos ac INNER JOIN tiposactivos tip ON ac.idTipo=tip.idTipo WHERE ac.ufvInicial > 0 AND ac.ValorRegistro >=${Valor[0].valor} AND (ac.idActivo REGEXP LOWER('${nombre}') OR tip.NombreActivo REGEXP LOWER('${nombre}'))`,(err, activo_list)=>{
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

export async function getDepreciaciones(req, res){
    try{
        const id = req.params.id;//id =idAmbiente
        const connection = await getConnection();
        await connection.query("  SELECT * FROM activos ac INNER JOIN tiposactivos tip  ON tip.idTipo=ac.idTipo INNER JOIN depreciaciones dep ON ac.idActivo=dep.idActivo order by dep.idActivo ", async (err, list_depreciaciones)=>{
            if(list_depreciaciones){
                res.status(200).send({depreciaciones: list_depreciaciones});
            }else{
                res.status(404).send({message: "No hay registro de depreciaciones."});
            }
        });
    }catch(error){
        res.status(500).send(error.message);
    }  
};


export async function postValorDepreciacion(req, res){
    try{
        const data = req.body;
        const valor = {
            Valor: data.Valor,
        }
        const connection = await getConnection();
        await connection.query("INSERT INTO valordepreciacion SET ?", valor);
        res.status(200).send({valor: valor});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getValorDepreciacion(req, res){
    try{
        const connection = await getConnection();
        await connection.query("SELECT * FROM valordepreciacion order by valor desc ",(err, valor_depreciacion)=>{
            if(valor_depreciacion){
                res.status(200).send({valor: valor_depreciacion});
            }else{
                res.status(404).send({message: "No hay valores para depreciar."});
            }
        });
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function deleteValorDepreciacion(req, res){
    try{
        const id = req.params.id;

        const connection = await getConnection();
        const resultado = await connection.query("DELETE FROM  valordepreciacion WHERE idValorDep= ?", id);
        res.status(200).send({valor: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

