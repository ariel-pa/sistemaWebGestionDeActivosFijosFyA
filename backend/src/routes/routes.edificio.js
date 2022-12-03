import { Router } from "express";

import * as ControllersEdificio from "../controllers/controllers.edificio";

const api = Router();

api.post('/edificio/registrar', ControllersEdificio.postEdificio);
// api.get('/edificios', ControllersEdificio.getEdificios);
api.get('/edificio/:id', ControllersEdificio.getEdificioById);
api.put('/edificio/editar/:id', ControllersEdificio.putEdificio);
api.delete('/edificio/eliminar/:id', ControllersEdificio.deleteEdificio);
api.get('/edificios/:nombre?', ControllersEdificio.getEdificioName);

export default api;