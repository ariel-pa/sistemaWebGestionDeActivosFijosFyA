import { Router } from "express";

import * as ControllersHistorial from "../controllers/controllers.historial";

const api = Router();

api.get('/historial/altas/:nombre?', ControllersHistorial.getHistorialActivosFijos);
api.get('/historial/altascod/:nombre?', ControllersHistorial.getHistorialActivosFijosCod);
api.get('/historial/ufvs/:nombre?', ControllersHistorial.getHistorialDepreciaciones);

export default api;