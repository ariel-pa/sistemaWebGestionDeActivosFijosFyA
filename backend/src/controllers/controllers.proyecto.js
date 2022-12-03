import {getConnection} from "./../database/database";

export async function postProyecto(req, res){
    try{
        const data = req.body;
        // console.log(data);
        const proyecto = {
            NombrePro: data.NombrePro,
            FechaInicio: data.FechaInicio,
            FechaFin: data.FechaFin,
            idPrograma: data.idPrograma,
        }
        // console.log(rubro);
        const connection = await getConnection();
        await connection.query("INSERT INTO proyectos SET ?", proyecto);
        res.status(200).send({proyecto: proyecto});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getProyectos(req, res){
    try{
        const connection = await getConnection();
        const resultado = await connection.query("SELECT * FROM proyectos");
        res.status(200).send({proyectos: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getProyectoById(req, res){
    try{
        const id = req.params.id;
        // console.log(id);
        const connection = await getConnection();
        const resultado = await connection.query("SELECT * FROM proyectos WHERE idProyecto = ?", id);
        res.status(200).send({proyecto: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function putProyecto(req, res){
    try{
        const id = req.params.id;
        const data = req.body; 
        
        const proyecto = {
            NombrePro: data.NombrePro,
            FechaInicio: data.FechaInicio,
            FechaFin: data.FechaFin,
            idPrograma: data.idPrograma,
        }
        const connection = await getConnection();
        const resultado = await connection.query("UPDATE proyectos SET ? WHERE idProyecto= ?", [proyecto, id]);
        res.status(200).send({proyecto: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function deleteProyecto(req, res){
    try{
        const id = req.params.id;

        const connection = await getConnection();
        const resultado = await connection.query("DELETE FROM proyectos WHERE idProyecto= ?", id);
        res.status(200).send({proyecto: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getProyectoName(req, res){
    try{
        const nombre = req.params['nombre'];
        // console.log(nombre);
        const connection = await getConnection();
        if(nombre === undefined){
            const resultado = await connection.query("SELECT * FROM proyectos proy INNER JOIN programas prog ON proy.idPrograma=prog.idPrograma WHERE NombrePro REGEXP LOWER('')");
            res.status(200).send({proyectos: resultado});
        }else{
            const resultado = await connection.query("SELECT * FROM proyectos proy INNER JOIN programas prog ON proy.idPrograma=prog.idPrograma WHERE NombrePro REGEXP LOWER('"+nombre+"')");
            res.status(200).send({proyectos: resultado});
        }
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getProyectosEjecucion(req, res){
    try{
        let fecha = new Date();
        let fecha_acual = `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`;
        console.log(fecha_acual);
        const connection = await getConnection();
        await connection.query(`SELECT * FROM proyectos proye
        INNER JOIN programas prog ON prog.idPrograma = proye.idPrograma
        WHERE proye.FechaFin >= '${fecha_acual}'`,(err, proyectos_ejecucion)=>{
            if(proyectos_ejecucion){
                res.status(200).send({proyectos: proyectos_ejecucion});
            }else{
                res.status(403).send({message: 'No hay proyecto en ejecucion'});
            }
        });
        
    }catch(error){
        res.status(500).send(error.message);
    }  
};