import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  public idUsuario: any;
  public usuario: any;
  public empleado: any;
  public PasswordText: any;
  public success_message: any;
  public error_message: any;
  public identity: any;

  constructor(
    private _route: ActivatedRoute,
    private _usuarioService: UsuarioService,
    private _router: Router,
  ) { 
    this.identity = this._usuarioService.getIdentity();
  }

  ngOnInit(): void {
    if(this.identity.Rol === 'ADMIN'){
      this._route.params.subscribe(
        params=>{
          this.idUsuario = params['id'];
          this._usuarioService.get_usuario(this.idUsuario).subscribe(
            res=>{
              // console.log(res.usuario[0]);
              this.usuario = res.usuario[0];
            },err=>{
  
            }
          );
        }
      );
  
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
      this._usuarioService.update_usuario({
        idUsuario: this.idUsuario,
        idEmplead: usuarioForm.value.idEmpleado,
        Email:  usuarioForm.value.Email,
        Password:  usuarioForm.value.Password,
        Rol:  usuarioForm.value.Rol,
        Estado:  usuarioForm.value.Estado
      }).subscribe(
        re=>{
          this.success_message = 'Datos de usuario actualizado correctamente.';
          // this.usuario = new Usuario('',1,'','','','','','');
          this.sleep(2000).then(() => this.success_message = '');
        },err=>{

        }
      );
    }else{
      // this.error_message = 'Complete el formulario';
      // this.sleep(2000).then(() => this.error_message = '');
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
