import { Router } from "express";

import * as ControllersFuncionario from "../controllers/controllers.funcionario";

const api = Router();

api.post('/funcionario/registrar', ControllersFuncionario.postFuncionario);
// api.get('/funcionarios', ControllersFuncionario.getFuncionarios);
api.get('/funcionario/:id', ControllersFuncionario.getFuncionarioById);
api.put('/funcionario/editar/:id', ControllersFuncionario.putFuncionario);
api.delete('/funcionario/eliminar/:id', ControllersFuncionario.deleteFuncionario);
api.get('/funcionarios/:nombre?', ControllersFuncionario.getFuncionarioName);

export default api;