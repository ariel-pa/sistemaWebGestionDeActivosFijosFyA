import {Routes, RouterModule, Route} from "@angular/router";//
import { ModuleWithProviders} from "@angular/core";//
import { LoginComponent } from "./components/login/login.component";//
import { DashboardComponent } from "./components/dashboard/dashboard.component";//
import { ActivoIndexComponent } from "./components/activos/activo-index/activo-index.component";//
import { ActivoCreateComponent } from "./components/activos/activo-create/activo-create.component";//
import { ActivoEditComponent } from "./components/activos/activo-edit/activo-edit.component";
import { EmpleadoIndexComponent } from "./components/empleados/empleado-index/empleado-index.component";
import { EmpleadoCreatComponent } from "./components/empleados/empleado-creat/empleado-creat.component";
import { EmpleadoEditComponent } from "./components/empleados/empleado-edit/empleado-edit.component";
import { UsuarioIndexComponent } from "./components/usuarios/usuario-index/usuario-index.component";
import { UsuarioCreateComponent } from "./components/usuarios/usuario-create/usuario-create.component";
import { UsuarioEditComponent } from "./components/usuarios/usuario-edit/usuario-edit.component";
import { AltaIndexComponent } from "./components/altas/alta-index/alta-index.component";
import { AltaDetalleComponent } from "./components/altas/alta-detalle/alta-detalle.component";
import { AltaCreateComponent } from "./components/altas/alta-create/alta-create.component";
import { DevolucionIndexComponent } from "./components/devoluciones/devolucion-index/devolucion-index.component";
import { BajaIndexComponent } from "./components/bajas/baja-index/baja-index.component";
import { RubroIndexComponent } from "./components/rubros/rubro-index/rubro-index.component";
import { TipobienIndexComponent } from "./components/tipobienes/tipobien-index/tipobien-index.component";
import { RubroCreateComponent } from "./components/rubros/rubro-create/rubro-create.component";
import { RubroEditComponent } from "./components/rubros/rubro-edit/rubro-edit.component";
import { TipobienCreateComponent } from "./components/tipobienes/tipobien-create/tipobien-create.component";
import { TipobienEditComponent } from "./components/tipobienes/tipobien-edit/tipobien-edit.component";
import { EdificioIndexComponent } from "./components/edificios/edificio-index/edificio-index.component";
import { EdificioCreateComponent } from "./components/edificios/edificio-create/edificio-create.component";
import { EdificioEditComponent } from "./components/edificios/edificio-edit/edificio-edit.component";
import { AmbienteIndexComponent } from "./components/ambientes/ambiente-index/ambiente-index.component";
import { AmbienteCreateComponent } from "./components/ambientes/ambiente-create/ambiente-create.component";
import { AmbienteEditComponent } from "./components/ambientes/ambiente-edit/ambiente-edit.component";
import { DepreciacionIndexComponent } from "./components/depreciaciones/depreciacion-index/depreciacion-index.component";
import { DepreciacionDetalleComponent } from "./components/depreciaciones/depreciacion-detalle/depreciacion-detalle.component";
import { ProyectoIndexComponent } from "./components/proyectos/proyecto-index/proyecto-index.component";
import { ProyectoCreateComponent } from "./components/proyectos/proyecto-create/proyecto-create.component";
import { ProyectoEditComponent } from "./components/proyectos/proyecto-edit/proyecto-edit.component";
import { RevalorizacionIndexComponent } from "./components/revalorizaciones/revalorizacion-index/revalorizacion-index.component";
import { MantenimientosIndexComponent } from "./components/mantenimientos/mantenimientos-index/mantenimientos-index.component";
import { ProveedorIndexComponent } from "./components/proveedores/proveedor-index/proveedor-index.component";
import { ProveedorCreateComponent } from "./components/proveedores/proveedor-create/proveedor-create.component";
import { ProveedorEditComponent } from "./components/proveedores/proveedor-edit/proveedor-edit.component";
import { BakupIndexComponent } from "./components/backups/bakup-index/bakup-index.component";
import { AltaAsignacionComponent } from "./components/altas/alta-asignacion/alta-asignacion.component";

import { HistorialAltasComponent } from "./components/historiales/historial-altas/historial-altas.component";
import { HistorialUfvsComponent } from "./components/historiales/historial-ufvs/historial-ufvs.component";
import { ValordepreciacionIndexComponent } from "./components/depreciaciones/valordepreciacion-index/valordepreciacion-index.component";


const appRoute:  Routes = [
    {path: '', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'activos', component: ActivoIndexComponent},
    {path: 'activo/registrar', component: ActivoCreateComponent},
    {path: 'activo/editar/:id', component: ActivoEditComponent},
    {path: 'empleados', component: EmpleadoIndexComponent},
    {path: 'empleado/registrar', component: EmpleadoCreatComponent},
    {path: 'empleado/editar/:id', component: EmpleadoEditComponent},

    {path: 'usuarios', component: UsuarioIndexComponent},
    {path: 'usuario/registrar', component: UsuarioCreateComponent},
    {path: 'usuario/editar/:id', component: UsuarioEditComponent},

    {path: 'altas', component: AltaIndexComponent},
    {path: 'alta/:id', component: AltaDetalleComponent},
    {path: 'altas/registrar', component: AltaCreateComponent},
    {path: 'activos/asignados', component: AltaAsignacionComponent},

    {path: 'devolucion', component: DevolucionIndexComponent},

    {path: 'bajas', component: BajaIndexComponent},

    {path: 'rubros', component: RubroIndexComponent},
    {path: 'rubro/registrar', component: RubroCreateComponent},
    {path: 'rubro/editar/:id', component: RubroEditComponent},
    
    {path: 'tipobienes', component: TipobienIndexComponent},
    {path: 'tipobien/registrar', component: TipobienCreateComponent},
    {path: 'tipobien/editar/:id', component: TipobienEditComponent},

    {path: 'edificios', component: EdificioIndexComponent},
    {path: 'edificio/registrar', component: EdificioCreateComponent},
    {path: 'edificio/editar/:id', component: EdificioEditComponent},

    {path: 'ambientes', component: AmbienteIndexComponent},
    {path: 'ambiente/registrar', component: AmbienteCreateComponent},
    {path: 'ambiente/editar/:id', component: AmbienteEditComponent},

    
    {path: 'depreciaciones', component: DepreciacionIndexComponent},
    {path: 'depreciacion/:id', component: DepreciacionDetalleComponent},
    //VALOR DE DEPRECIACION
    {path: 'valores', component: ValordepreciacionIndexComponent},

    
    {path: 'proyectos', component: ProyectoIndexComponent},
    {path: 'proyecto/registrar', component: ProyectoCreateComponent},
    {path: 'proyecto/editar/:id', component: ProyectoEditComponent},

    {path: 'revalorizaciones', component: RevalorizacionIndexComponent},

    {path: 'mantenimiento', component: MantenimientosIndexComponent},
    // {path: '/registrar', component: UsuarioCreateComponent},

    {path: 'proveedores', component: ProveedorIndexComponent},
    {path: 'proveedor/registrar', component: ProveedorCreateComponent},
    {path: 'proveedor/editar/:id', component: ProveedorEditComponent},

    {path: 'buckups/registrar', component: BakupIndexComponent},

    {path: 'historialAltas', component: HistorialAltasComponent},
    {path: 'historialUfvs', component: HistorialUfvsComponent},

]

export const appRoutingProviders : any[] = [];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRoute);