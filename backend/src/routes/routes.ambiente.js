import { Router } from "express";

import * as ControllersAmbiente from "../controllers/controllers.ambiente";

const api = Router();

api.post('/ambiente/registrar', ControllersAmbiente.postAmbiente);
// api.get('/ambientes', ControllersAmbiente.getAmbientes);
api.get('/ambiente/:id', ControllersAmbiente.getAmbienteById);
api.put('/ambiente/editar/:id', ControllersAmbiente.putAmbiente);
api.delete('/ambiente/eliminar/:id', ControllersAmbiente.deleteAmbiente);
api.get('/ambientes/:nombre?', ControllersAmbiente.getAmbienteName);
api.get('/edificio/ambiente/:id', ControllersAmbiente.getEdificioAmbienteById);
export default api;