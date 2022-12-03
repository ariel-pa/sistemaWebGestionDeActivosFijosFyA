import { Router } from "express";

import * as ControllersDepreciacion from "../controllers/controllers.depreciacion";

const api = Router();

api.post('/depreciacion/registrar',ControllersDepreciacion.postDepreciacionActivo);
// api.get('/empleadoalta', ControllersAltaActivo.getEmpleadoAltaActivo);//--para listar empleados y pasar el id
api.get('/datadepreciacion/:id', ControllersDepreciacion.getDatosDepreciacionById);//--optine los activos y sus depreciaciones
api.get('/depreciacion/:nombre?', ControllersDepreciacion.getActivosDepreciacionCodigo);//Consulta de activos fijos para depreciar
api.get('/depreciaciones', ControllersDepreciacion.getDepreciaciones);//Activos fijos depreciados 

// api.get('/altaactivo/:id', ControllersAltaActivo.getDetalleAltaActivoById);//---lisata los activoa asignados de un empleado
// api.get('/altaactivos', ControllersAltaActivo.getAltaActivos);//---opcional por a hora
// api.delete('/altaactivo/eliminar/:id', ControllersAltaActivo.deleteAltaActivo);

//VALOR PARA DEPRECIAR

api.post('/valor/registrar',ControllersDepreciacion.postValorDepreciacion);
// api.put('/valor/editar',ControllersDepreciacion.);
api.get('/valores', ControllersDepreciacion.getValorDepreciacion);
api.delete('/valor/eliminar/:id', ControllersDepreciacion.deleteValorDepreciacion);
export default api;