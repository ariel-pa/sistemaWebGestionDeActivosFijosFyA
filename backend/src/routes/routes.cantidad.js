import { Router } from "express";

import * as ControllersCantidad from "../controllers/controllers.cantidad";

const api = Router();

api.get('/cant_disponible', ControllersCantidad.getCantidadDisponible);
api.get('/cant_asignado', ControllersCantidad.getCantidadUso);
api.get('/cant_mantenimiento', ControllersCantidad.getCantidadMantenimiento);
api.get('/cant_baja', ControllersCantidad.getCantidadBaja);

api.get('/cant_depreiados', ControllersCantidad.getCantidadDepreciados);
api.get('/cant_revalorizar', ControllersCantidad.getCantidadRevalorizados);
api.get('/cant_edificios', ControllersCantidad.getCantidadEdificios);
api.get('/cant_reqmantenimiento', ControllersCantidad.getCantRequiereMantenimiento);
export default api;