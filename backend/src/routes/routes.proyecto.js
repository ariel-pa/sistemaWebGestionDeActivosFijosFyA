import { Router } from "express";

import * as ControllersProyecto from "../controllers/controllers.proyecto";

const api = Router();

api.post('/proyecto/registrar', ControllersProyecto.postProyecto);
// api.get('/proyectos', ControllersProyecto.getProyectos);
api.get('/proyecto/:id', ControllersProyecto.getProyectoById);
api.put('/proyecto/editar/:id', ControllersProyecto.putProyecto);
api.delete('/proyecto/eliminar/:id', ControllersProyecto.deleteProyecto);
api.get('/proyectos/:nombre?', ControllersProyecto.getProyectoName);

api.get('/proyectosejecucion', ControllersProyecto.getProyectosEjecucion);

export default api;