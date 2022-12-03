import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http';//
import {FormsModule} from '@angular/forms';//
import { routing } from "./app.routing";//

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ActivoIndexComponent } from './components/activos/activo-index/activo-index.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ActivoCreateComponent } from './components/activos/activo-create/activo-create.component';
import { ActivoEditComponent } from './components/activos/activo-edit/activo-edit.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { EmpleadoIndexComponent } from './components/empleados/empleado-index/empleado-index.component';
import { EmpleadoCreatComponent } from './components/empleados/empleado-creat/empleado-creat.component';
import { EmpleadoEditComponent } from './components/empleados/empleado-edit/empleado-edit.component';
import { UsuarioIndexComponent } from './components/usuarios/usuario-index/usuario-index.component';
import { UsuarioCreateComponent } from './components/usuarios/usuario-create/usuario-create.component';
import { UsuarioEditComponent } from './components/usuarios/usuario-edit/usuario-edit.component';
import { AltaIndexComponent } from './components/altas/alta-index/alta-index.component';
import { AltaDetalleComponent } from './components/altas/alta-detalle/alta-detalle.component';
import { AltaCreateComponent } from './components/altas/alta-create/alta-create.component';
import { DevolucionIndexComponent } from './components/devoluciones/devolucion-index/devolucion-index.component';
import { BajaIndexComponent } from './components/bajas/baja-index/baja-index.component';
import { RubroIndexComponent } from './components/rubros/rubro-index/rubro-index.component';
import { TipobienIndexComponent } from './components/tipobienes/tipobien-index/tipobien-index.component';
import { RubroCreateComponent } from './components/rubros/rubro-create/rubro-create.component';
import { RubroEditComponent } from './components/rubros/rubro-edit/rubro-edit.component';
import { TipobienCreateComponent } from './components/tipobienes/tipobien-create/tipobien-create.component';
import { TipobienEditComponent } from './components/tipobienes/tipobien-edit/tipobien-edit.component';
import { EdificioIndexComponent } from './components/edificios/edificio-index/edificio-index.component';
import { EdificioCreateComponent } from './components/edificios/edificio-create/edificio-create.component';
import { EdificioEditComponent } from './components/edificios/edificio-edit/edificio-edit.component';
import { AmbienteIndexComponent } from './components/ambientes/ambiente-index/ambiente-index.component';
import { AmbienteCreateComponent } from './components/ambientes/ambiente-create/ambiente-create.component';
import { AmbienteEditComponent } from './components/ambientes/ambiente-edit/ambiente-edit.component';
import { DepreciacionIndexComponent } from './components/depreciaciones/depreciacion-index/depreciacion-index.component';
import { DepreciacionDetalleComponent } from './components/depreciaciones/depreciacion-detalle/depreciacion-detalle.component';
import { ProyectoIndexComponent } from './components/proyectos/proyecto-index/proyecto-index.component';
import { ProyectoCreateComponent } from './components/proyectos/proyecto-create/proyecto-create.component';
import { ProyectoEditComponent } from './components/proyectos/proyecto-edit/proyecto-edit.component';
import { RevalorizacionIndexComponent } from './components/revalorizaciones/revalorizacion-index/revalorizacion-index.component';
import { MantenimientosIndexComponent } from './components/mantenimientos/mantenimientos-index/mantenimientos-index.component';
import { ProveedorIndexComponent } from './components/proveedores/proveedor-index/proveedor-index.component';
import { ProveedorCreateComponent } from './components/proveedores/proveedor-create/proveedor-create.component';
import { ProveedorEditComponent } from './components/proveedores/proveedor-edit/proveedor-edit.component';
import { BakupIndexComponent } from './components/backups/bakup-index/bakup-index.component';
import { AltaAsignacionComponent } from './components/altas/alta-asignacion/alta-asignacion.component';
import { HistorialAltasComponent } from './components/historiales/historial-altas/historial-altas.component';
import { HistorialUfvsComponent } from './components/historiales/historial-ufvs/historial-ufvs.component';
import { ValordepreciacionIndexComponent } from './components/depreciaciones/valordepreciacion-index/valordepreciacion-index.component';

import { GoogleMapsModule } from '@angular/google-maps';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ActivoIndexComponent,
    SidebarComponent,
    ActivoCreateComponent,
    ActivoEditComponent,
    EmpleadoIndexComponent,
    EmpleadoCreatComponent,
    EmpleadoEditComponent,
    UsuarioIndexComponent,
    UsuarioCreateComponent,
    UsuarioEditComponent,
    AltaIndexComponent,
    AltaDetalleComponent,
    AltaCreateComponent,
    DevolucionIndexComponent,
    BajaIndexComponent,
    RubroIndexComponent,
    TipobienIndexComponent,
    RubroCreateComponent,
    RubroEditComponent,
    TipobienCreateComponent,
    TipobienEditComponent,
    EdificioIndexComponent,
    EdificioCreateComponent,
    EdificioEditComponent,
    AmbienteIndexComponent,
    AmbienteCreateComponent,
    AmbienteEditComponent,
    DepreciacionIndexComponent,
    DepreciacionDetalleComponent,
    ProyectoIndexComponent,
    ProyectoCreateComponent,
    ProyectoEditComponent,
    RevalorizacionIndexComponent,
    MantenimientosIndexComponent,
    ProveedorIndexComponent,
    ProveedorCreateComponent,
    ProveedorEditComponent,
    BakupIndexComponent,
    AltaAsignacionComponent,
    HistorialAltasComponent,
    HistorialUfvsComponent,
    ValordepreciacionIndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
    FormsModule,
    routing,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
