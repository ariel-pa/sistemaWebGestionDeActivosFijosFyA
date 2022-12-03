import { Router } from "express";

import * as ControllersDevolucion from "../controllers/controllers.devolucion";

const api = Router();

api.post('/devolucion/registrar', ControllersDevolucion.postAltaDevolucion);
api.get('/devoluciones/:nombre?', ControllersDevolucion.getDevolucionNombre);
export default api;