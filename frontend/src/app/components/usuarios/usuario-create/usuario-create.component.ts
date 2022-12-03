import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/models/Empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';//importado
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from "../../../models/Usuario";

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.css']
})
export class UsuarioCreateComponent implements OnInit {

  public empleado: any={};
  public usuario: any={};
  public empleados: any;
  public identity: any;

  public success_message: any;
  public error_message: any;

  constructor(
    private _usuarioService: UsuarioService,
    private _empleadoService: EmpleadoService,
    private _router: Router,
  ) { 
    this.usuario = new Usuario('',1,'','','','','','');
    // this.empleado =new Empleado(1,'','','','','','',1);
    this.identity = this._usuarioService.getIdentity();
  }

  ngOnInit(): void {
    if(this.identity.Rol=== 'ADMIN'){
      this._usuarioService.get_empleados('').subscribe(
        res=>{
          this.empleado = res.empleados;
          // console.log("hola",this.empleado);
        },
        err=>{
  
        }
      );
    }else{
      this._router.navigate(['dashboard']);
    }

  }

  onSubmit(usuarioForm: any){
    if(usuarioForm.valid){
      // console.log(usuarioForm.value);
      this._usuarioService.insert_usuario({
        idEmplead: usuarioForm.value.idEmpleado,
        Email: usuarioForm.value.Email,
        Password: usuarioForm.value.Password,
        Rol: usuarioForm.value.Rol,
        Estado: usuarioForm.value.Estado,
      }).subscribe(
        res=>{
          this.success_message = 'Usuario registrado correctamente.';
          // this.usuario = new Usuario('',1,'','','','','','');
          this.sleep(2000).then(() => this.success_message = '');
        },err=>{

        }
      );
    }else{
      this.error_message = 'Complete el formulario';
      this.sleep(2000).then(() => this.error_message = '');
    }
  }

  success_alert(){
    this.success_message = ''; 
  }

  error_alert(){
    this.error_message = ''; 
  }
  sleep(milliseconds : number) {
    return new Promise(resolve => setTimeout( resolve, milliseconds));
  }
}

