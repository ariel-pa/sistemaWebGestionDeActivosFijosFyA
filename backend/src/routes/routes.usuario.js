import { Router } from "express";

//Import controllers usuario
import * as ControllersUsuario from "../controllers/controllers.usuario";



const api = Router();

api.post('/login', ControllersUsuario.loginUsuario);
api.post('/registrar', ControllersUsuario.postUsuario);
api.get('/usuarios', ControllersUsuario.getUsuario);
api.put('/usuario/editar/:id', ControllersUsuario.putUsuario);
api.get('/usuario/:id', ControllersUsuario.getUsuarioById);

export default api;

