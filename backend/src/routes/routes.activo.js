import { Router } from "express";

import * as ControllersActivo from "../controllers/controllers.activo";

//manejo de imagenes en la carpeta uploads

var multipart = require('connect-multiparty'); 
var path = multipart({uploadDir: './uploads/activos'});

const api = Router();

api.post('/activo/registrar',path, ControllersActivo.postActivo); //mediante path podemos ingresar imagenes del formulario
api.get('/activos/:nombre?', ControllersActivo.getActivoCodigo);
api.put('/activo/editar/:id/:img', path, ControllersActivo.putActivo);
api.get('/activo/:id', ControllersActivo.getActivoById);
api.delete('/activo/eliminar/:id', ControllersActivo.deleteActivo); 

api.get('/activo/img/:img', ControllersActivo.get_imagen);//obtener imagen del activo 
api.get('/activo/factura/:fac', ControllersActivo.get_factura);//obtener imagen del activo 
export default api;