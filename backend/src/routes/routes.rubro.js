import { Router } from "express";

//Import controllers usuario
import * as ControllersRubro from "../controllers/controllers.rubro";

const api = Router();

api.post('/rubro/registrar',ControllersRubro.postRubro);
api.get('/rubros', ControllersRubro.getRubros);
api.get('/rubro/:id', ControllersRubro.getRubroById);
api.put('/rubro/editar/:id', ControllersRubro.putRubro);
api.delete('/rubro/eliminar/:id', ControllersRubro.deleteRubro);
api.get('/rubros/:nombre?', ControllersRubro.getRubroName);

export default api;
