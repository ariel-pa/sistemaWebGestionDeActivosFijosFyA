import { Router } from "express";

import * as ControllersRevalorizacion from "../controllers/controllers.revalorizacion";

const api = Router();

api.post('/revalorizacion/registrar',ControllersRevalorizacion.postRevalorizacionActivo);
// api.get('/datadepreciacion/:id', ControllersDepreciacion.getDatosDepreciacionById);//--optine los activos y sus depreciaciones
api.get('/revalorizacion/:nombre?', ControllersRevalorizacion.getActivosRevalorizacionCodigo);//Consulta de activos fijos para depreciar




export default api;