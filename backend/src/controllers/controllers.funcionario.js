import {getConnection} from "./../database/database";

export async function postFuncionario(req, res){
    try{
        const data = req.body;
        // console.log(data);
        const funcionario = {
            Nombres: data.Nombres,
            Apellidos: data.Apellidos,
            Cargo: data.Cargo,
            // Email: data.Email,
            Telefono: data.Telefono,
            Direccion: data.Direccion,
            idAmbient: data.idAmbiente
        }
        // console.log(rubro);
        const connection = await getConnection();
        await connection.query("INSERT INTO empleados SET ?", funcionario);
        res.status(200).send({funcionario: funcionario});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getFuncionarios(req, res){
    try{
        const connection = await getConnection();
        const resultado = await connection.query("SELECT * FROM empleados");
        res.status(200).send({funcionarios: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getFuncionarioById(req, res){
    try{
        const id = req.params.id;
        // console.log(id);
        const connection = await getConnection();
        const resultado = await connection.query("SELECT * FROM empleados WHERE idEmpleado = ?", id);
        res.status(200).send({funcionario: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function putFuncionario(req, res){
    try{
        const id = req.params.id;
        const data = req.body; 
        
        const funcionario = {
            Nombres: data.Nombres,
            Apellidos: data.Apellidos,
            Cargo: data.Cargo,
            // Email: data.Email,
            Telefono: data.Telefono,
            Direccion: data.Direccion,
            idAmbient: data.idAmbiente
        }
        const connection = await getConnection();
        const resultado = await connection.query("UPDATE empleados SET ? WHERE idEmpleado= ?", [funcionario, id]);
        res.status(200).send({funcionario: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function deleteFuncionario(req, res){
    try{
        const id = req.params.id;

        const connection = await getConnection();
        const resultado = await connection.query("DELETE FROM empleados WHERE idEmpleado= ?", id);
        res.status(200).send({funcionario: resultado});
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getFuncionarioName(req, res){
    try{
        const nombre = req.params['nombre'];
        // console.log(nombre);
        const connection = await getConnection();
        if(nombre === undefined){
            const resultado = await connection.query("SELECT * FROM empleados em INNER JOIN ambientes am ON em.idAmbient=am.idAmbiente INNER JOIN edificios ed ON am.idEdificio= ed.idEdificio WHERE em.Nombres REGEXP LOWER('')");
            res.status(200).send({empleados: resultado});
        }else{
            const resultado = await connection.query("SELECT * FROM empleados em INNER JOIN ambientes am ON em.idAmbient=am.idAmbiente INNER JOIN edificios ed ON am.idEdificio= ed.idEdificio WHERE em.Nombres REGEXP LOWER('"+nombre+"')");
            res.status(200).send({empleados: resultado});
        }
    }catch(error){
        res.status(500).send(error.message);
    }  
};