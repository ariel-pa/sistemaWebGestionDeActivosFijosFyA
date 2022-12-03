import { Router } from "express";

import * as ControllersBaja from "../controllers/controllers.baja";

const api = Router();

api.post('/baja/registrar', ControllersBaja.postBajaActivo);
api.get('/bajas/:nombre?', ControllersBaja.getBajaNombre);
export default api;