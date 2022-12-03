import { Router } from "express";

import * as ControllersMantenimiento from "../controllers/controllers.mantenimiento";

const api = Router();

api.post('/mantenimiento/registrar', ControllersMantenimiento.postMantenimiento);
api.get('/mantenimientos/:nombre?', ControllersMantenimiento.getMantenimiento);
api.delete('/mantenimiento/eliminar/:id', ControllersMantenimiento.deleteMantenimiento);
export default api;