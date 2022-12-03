import { Router } from "express";

// //Import controllers usuario
import * as ControllersCondicion from "../controllers/controllers.condicion";

const api = Router();

api.post('/condicion/registrar', ControllersCondicion.postCondicion);
// api.get('/condiciones', ControllersCondicion.getCondiciones);
api.get('/condicion/:id', ControllersCondicion.getCondicionById);
api.put('/condicion/editar/:id', ControllersCondicion.putCondicion);
api.delete('/condicion/eliminar/:id', ControllersCondicion.deleteCondicion);
api.get('/condiciones/:nombre?', ControllersCondicion.getCondicionName);

export default api;