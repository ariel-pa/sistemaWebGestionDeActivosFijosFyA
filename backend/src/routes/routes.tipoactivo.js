import { Router } from "express";

import * as ControllersTipoActivo from "../controllers/controllers.tipoactivo";

const api = Router();

api.post('/tipoactivo/registrar', ControllersTipoActivo.postTipoActivo);
// api.get('/condiciones', ControllersCondicion.getCondiciones);
api.get('/tipoactivo/:id', ControllersTipoActivo.getTipoActivoById);
api.put('/tipoactivo/editar/:id', ControllersTipoActivo.putTipoActivo);
api.delete('/tipoactivo/eliminar/:id', ControllersTipoActivo.deleteTipoActivo);
api.get('/tipoactivos/:nombre?', ControllersTipoActivo.getTipoActivoName);

export default api;