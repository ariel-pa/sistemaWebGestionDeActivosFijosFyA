import express from "express";
import bodyparser from "body-parser";
import morgan from "morgan";

//Import routes
import routesUsuario from "./routes/routes.usuario";
import routesProveedor from "./routes/routes.proveedor";
import routesRubro from "./routes/routes.rubro";
import routesUbicacion from "./routes/routes.ubicacion";
import routesCondicion from "./routes/routes.condicion";
import routesTipoActivo from "./routes/routes.tipoactivo";
import routesPrograma from "./routes/routes.programa";
import routesProyecto from "./routes/routes.proyecto";
import routesEdificio from "./routes/routes.edificio";
import routesAmbiente from "./routes/routes.ambiente";
import routesFuncionario from "./routes/routes.funcionario";
import routesActivo from "./routes/routes.activo";
import routesAltaActivo from "./routes/routes.altaactivo";
import routesDevolucion from "./routes/routes.devolucion";
import routesBaja from "./routes/routes.baja";
import routesDepreciacion from "./routes/routes.depreciacion";
import routesRevalorizacion from "./routes/routes.revalorizacion";
import routesCantidad from "./routes/routes.cantidad";
import routesMantenimiento from "./routes/routes.mantenimiento";
import routesBackup from "./routes/routes.backup";
import routesHistorial from "./routes/routes.historial";

//Inicialización
const app = express();

//Settings
app.set("port", 3000);

//Middlewares
app.use(bodyparser.urlencoded({extended: true}));//anailizar texto como datos codificados en la url
app.use(bodyparser.json());
app.use(morgan("dev"));
app.use(express.json());


app.use((req, res, next)=>{
    res.header('Content-Type: application/json');
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});


//Routes
app.use('/api', routesUsuario);
app.use('/api', routesProveedor);
app.use('/api', routesRubro);
app.use('/api', routesUbicacion);
app.use('/api', routesCondicion);
app.use('/api', routesTipoActivo);
app.use('/api', routesPrograma);
app.use('/api', routesProyecto);
app.use('/api', routesEdificio);
app.use('/api', routesAmbiente);
app.use('/api', routesFuncionario);
app.use('/api', routesActivo);
app.use('/api', routesAltaActivo);
app.use('/api', routesDevolucion);
app.use('/api', routesBaja);
app.use('/api', routesDepreciacion);
app.use('/api', routesRevalorizacion);
app.use('/api', routesCantidad);
app.use('/api', routesMantenimiento);
app.use('/api', routesBackup);
app.use('/api', routesHistorial);


export default app;