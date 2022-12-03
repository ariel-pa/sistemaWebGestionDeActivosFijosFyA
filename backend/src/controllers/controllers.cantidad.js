import {getConnection} from "../database/database";

export async function getCantidadUso(req, res){
    try{
        const connection = await getConnection();
        await connection.query("select count(*) as Asignados from activos where Estado='En uso'",(err, uso)=>{
            if(uso){
                res.status(200).send({uso: uso});
            }else{
                res.status(403).send({message: 'No hay registro de activos fijos en uso'});
            }
        });
    }catch(error){
        res.status(500).send(error.message);
    }  
}

export async function getCantidadBaja(req, res){
    try{

        const connection = await getConnection();
        await connection.query("select count(*) as Baja from bajas",(err, baja)=>{
            if(baja){
                res.status(200).send({baja: baja});
            }else{
                res.status(403).send({message: 'No hay registro de activos fijos que esten de baja'});
            }
        });
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getCantidadMantenimiento(req, res){
    try{

        const connection = await getConnection();
        await connection.query("select count(*) as Mantenimiento from Mantenimiento",(err, mantenimiento)=>{
            if(mantenimiento){
                res.status(200).send({mantenimiento: mantenimiento});
            }else{
                res.status(403).send({message: 'No hay registro de activos fijos en mantenimiento'});
            }
        });
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getCantidadDisponible(req, res){
    try{

        const connection = await getConnection();
        await connection.query("select count(*) as Disponibles from activos where Estado='Activo'",(err, disponible)=>{
            if(disponible){
                res.status(200).send({disponible: disponible});
            }else{
                res.status(403).send({message: 'No hay registro de activos fijos disponibles'});
            }
        });
    }catch(error){
        res.status(500).send(error.message);
    }  
};


export async function getCantidadDepreciados(req, res){
    try{
        const connection = await getConnection();
        await connection.query("SELECT count(distinct(dep.idActivo)) AS cantDepreciados FROM depreciaciones dep",(err, cant_depreciados)=>{
            if(cant_depreciados){
                res.status(200).send({depreciados: cant_depreciados});
            }else{
                res.status(403).send({message: 'No hay registros de depreciaciones'});
            }
        });
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getCantidadRevalorizados(req, res){
    try{
        const connection = await getConnection();
        await connection.query("SELECT count(*) ReqRevalorizacion FROM activos ac WHERE ac.ValorActual = 1",(err, cant_revalorizar)=>{
            if(cant_revalorizar){
                res.status(200).send({revalorizar: cant_revalorizar});
            }else{
                res.status(403).send({message: 'No hay registros de revalorizaciones'});
            }
        });
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getCantidadEdificios(req, res){
    try{
        const connection = await getConnection();
        await connection.query("SELECT count(*) AS edificios FROM edificios ed",(err, cant_edificios)=>{
            if(cant_edificios){
                res.status(200).send({edificios: cant_edificios});
            }else{
                res.status(403).send({message: 'No hay registros de edificios'});
            }
        });
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getCantRequiereMantenimiento(req, res){
    try{
        const connection = await getConnection();
        await connection.query("SELECT count(*) as ReqMantenimiento FROM activos ac INNER JOIN tiposactivos tip ON tip.idTipo = ac.idTipo WHERE ac.Estado <>'Baja' AND (ac.idCondicion = 4 OR ac.idCondicion = 5)",(err, cant_ReqMantenimiento)=>{
            if(cant_ReqMantenimiento){
                res.status(200).send({reqmantenimiento: cant_ReqMantenimiento});
            }else{
                res.status(403).send({message: 'No hay activos que requieren mantenimiento'});
            }
        });
    }catch(error){
        res.status(500).send(error.message);
    }  
};

