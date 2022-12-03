import { Router } from "express";

//Import controllers usuario
import * as ControllersProveedor from "../controllers/controllers.proveedor";

const api = Router();

api.post('/proveedor/registrar', ControllersProveedor.postProveedor);
api.get('/proveedor/:id', ControllersProveedor.getProveedorById);
api.put('/proveedor/editar/:id', ControllersProveedor.putProveedor);
api.delete('/proveedor/eliminar/:id', ControllersProveedor.deleteProveedor);
api.get('/proveedores/:nombre?', ControllersProveedor.getProveedorName);

export default api;