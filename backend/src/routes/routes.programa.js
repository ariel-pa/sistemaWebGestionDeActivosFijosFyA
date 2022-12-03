import { Router } from "express";

import * as ControllersPrograma from "../controllers/controllers.programa";

const api = Router();

api.post('/programa/registrar', ControllersPrograma.postPrograma);
// api.get('/programas', ControllersPrograma.getProgramas);
api.get('/programa/:id', ControllersPrograma.getProgramaById);
api.put('/programa/editar/:id', ControllersPrograma.putPrograma);
api.delete('/programa/eliminar/:id', ControllersPrograma.deletePrograma);
api.get('/programas/:nombre?', ControllersPrograma.getProgramaName);

export default api;