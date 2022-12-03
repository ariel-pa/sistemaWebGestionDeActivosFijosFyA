import {getConnection} from "./../database/database";
import bcrypt from "bcrypt-nodejs";
import jwt from "./../helpers/jwt";
import jwto from "jsonwebtoken";

var secret = 'llavesecreta';

export async function getUsuario(req, res){
    try{
        const connection = await getConnection();
        await connection.query("SELECT * FROM usuarios us INNER JOIN empleados em ON us.idEmplead = em.idEmpleado", (err, usuarios_list)=>{
            if(usuarios_list){
                res.status(200).send({user: usuarios_list});
            }else{
                res.status(403).send({error: 'No hay registros'});
            }
        });
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function getUsuarioById(req, res){
    try{
        const id = req.params.id;
        const connection = await getConnection();
        await connection.query("SELECT * FROM usuarios WHERE idUsuario=?",id, (err, usuarios_list)=>{
            if(usuarios_list){
                res.status(200).send({usuario: usuarios_list});
            }else{
                res.status(403).send({error: 'No hay registro'});
            }
        });
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function postUsuario(req, res){
    try{
        const data = req.body;
        // console.log(data);
        // const fecha = new Date().toLocaleDateString();
        // const hora= new Date().toLocaleTimeString();
        // console.log(fecha,"-", hora);

        if(data.Password && data.Email){
            bcrypt.hash(data.Password, null, null, async function(err, hash){
                if(hash){
                    // console.log(hash);
                    const usuario = {
                        idEmplead: data.idEmplead,
                        Email: data.Email,
                        Password: hash,
                        Rol: data.Rol,
                        Estado: data.Estado
                    };
                    const connection = await getConnection();
                    await connection.query("INSERT INTO usuarios SET ?", usuario, (err, usuario_save)=>{
                        if(usuario_save){
                            res.status(200).send({user: usuario_save});
                        }else{
                            res.status(403).send({error: 'No se registro el usuario'});
                        }
                    });
                }
            });
        }else{
            res.status(403).json({message: 'No ingreso el email o la contraseña'});
        }
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function putUsuario(req, res){
    try{
        const id = req.params.id;
        const data = req.body;

        if(data.Password != undefined){
            bcrypt.hash(data.Password, null, null, async function(err, hash){//la nueva contraseña lo iencripta
                if(hash){
                    const usuario = {
                        idEmplead: data.idEmplead,
                        Email: data.Email,
                        Password: hash,
                        Rol: data.Rol,
                        Estado: data.Estado
                    };
                    const connection = await getConnection();
                    await connection.query("UPDATE usuarios SET ? WHERE idUsuario= ?",[usuario, id], (err, usuario_edit)=>{
                        if(usuario_edit){
                            res.status(200).send({usuario: usuario_edit});
                        }else{
                            res.status(403).send({message: 'El usuario no se pudo editar'});
                        }
                    });
                }
            });
        }else{
            const usuario = {
                idEmplead: data.idEmplead,
                Email: data.Email,
                // Password: hash,
                Rol: data.Rol,
                Estado: data.Estado
            };
            const connection = await getConnection();
            await connection.query("UPDATE usuarios SET ? WHERE idUsuario= ?",[usuario, id], (err, usuario_edit)=>{
                if(usuario_edit){
                    res.status(200).send({usuario: usuario_edit});
                }else{
                    res.status(403).send({message: 'El usuario no se pudo editar'});
                }
            });
        }
    }catch(error){
        res.status(500).send(error.message);
    }  
};

export async function loginUsuario(req, res){
    try{
        const data = req.body;
        // console.log(data);
        const connection = await getConnection();
        await connection.query("SELECT us.idUsuario, em.Nombres, em.Apellidos, us.Email, us.Password, us.Rol, us.Estado FROM usuarios us INNER JOIN empleados em ON us.idEmplead=em.idEmpleado WHERE us.Email = ?", data.Email, (err, usuario_data)=>{
            if(usuario_data.length){
                bcrypt.compare(data.Password, usuario_data[0].Password, function(err, check){
                    if(check){
                            if(data.gettoken){
                                res.status(200).send({
                                jwt: jwt.createToken(usuario_data[0]),
                                user: usuario_data[0],
                                // decodi: jwto.verify(jwt.createToken(usuario_data[0]), secret)
                                });
                            }else{
                                res.status(200).send({
                                user: usuario_data[0],
                                message: 'no token',
                                jwt: jwt.createToken(usuario_data[0]),
                                });
                            }  
                    }else{
                        res.status(403).send({message: 'El corre o contraseña no coinciden'});
                    }
                });
            }else{
                res.status(403).json({message: 'El correo no existe'});
            }
        });
    }catch(error){
        res.status(500).send(error.message);
    }  
};

