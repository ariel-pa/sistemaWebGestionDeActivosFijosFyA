import { Router } from "express";

import * as ControllersUbicacion from "../controllers/controllers.ubicacion";

const api = Router();

api.post('/ubicacion/registrar', ControllersUbicacion.postUbicacion);
// api.get('/ubicaciones', ControllersUbicacion.getUbicaciones);
api.get('/ubicacion/:id', ControllersUbicacion.getUbicacionById);
api.put('/ubicacion/editar/:id', ControllersUbicacion.putUbicacion);
api.delete('/ubicacion/eliminar/:id', ControllersUbicacion.deleteUbicacion );
api.get('/ubicaciones/:nombre?', ControllersUbicacion.getUbicacionName);

export default api;