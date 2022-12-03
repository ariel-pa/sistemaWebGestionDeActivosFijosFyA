import { Router } from "express";
var multipart = require('connect-multiparty'); 
var path = multipart({uploadDir: './uploads/activos'});


import * as ControllersAltaActivo from "../controllers/controllers.altaactivo";

const api = Router(); 
// api.get('/altaactivo/altaPDF', ControllersAltaActivo.getPDFAltas);

api.post('/altaactivo/registrar', ControllersAltaActivo.postAltaActivo);
api.get('/empleadoalta', ControllersAltaActivo.getEmpleadoAltaActivo);//--para listar empleados y pasar el id
api.get('/dataaltaactivo/:id/:nombre?', ControllersAltaActivo.getDatosAltaActivoById);//--optine el cliente y sus altas
api.get('/activosalta/:nombre?', ControllersAltaActivo.getActivosAltaCodigo);//Consulta de activos disponibles

api.get('/altas/:nombre?', ControllersAltaActivo.getActivosAlta);//---lista de activos asignados
api.get('/altasFecha/:fecha?', ControllersAltaActivo.getActivosAltaFiltroFecha);

api.get('/altaactivo/:id', ControllersAltaActivo.getDetalleAltaActivoById);//---lisata los activoa asignados de un empleado
api.get('/altaactivos', ControllersAltaActivo.getAltaActivos);//---opcional por a hora
api.delete('/altaactivo/eliminar/:id', ControllersAltaActivo.deleteAltaActivo);
api.get('/altaactivo/pdfWithQr/:id', ControllersAltaActivo.getPDFWithQr);


export default api;