import { Router } from "express";

// //Import controllers usuario
import * as ControllersBackup from "../controllers/controllers.backup";

const api = Router();

api.post('/backup', ControllersBackup.backups);


export default api;