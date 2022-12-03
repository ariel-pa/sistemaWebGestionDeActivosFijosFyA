import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-empleado-edit',
  templateUrl: './empleado-edit.component.html',
  styleUrls: ['./empleado-edit.component.css']
})
export class EmpleadoEditComponent implements OnInit {
  public identity: any
  public idEmpleado: any;
  public empleado: any={};
  public ambientes: any

  public success_message: any;
  public error_message: any;

  constructor(
    private _usarioService: UsuarioService,
    private _routes: Router,
    private _route: ActivatedRoute,
    private _empleadoService: EmpleadoService,
  ) {
    this.identity = this._usarioService.getIdentity();
   }

  ngOnInit(): void {
    if(this.identity){
      this._route.params.subscribe(
        paramas=>{
          this.idEmpleado = paramas['id'];
          this._empleadoService.get_empleado(this.idEmpleado).subscribe(
            res=>{
              this.empleado =res.funcionario[0];
            },err=>{
              
            }
          );
        }
      );
  
      this._empleadoService.get_ambiente().subscribe(
        response=>{
          this.ambientes = response.ambientes;
          // console.log(this.ambientes);
        },
        error=>{
  
        }
      );
    }else{
      this._routes.navigate(['']);
    }

  }

  onSubmit(empleadoForm: any){
    if(empleadoForm.valid){
      this._empleadoService.update_empleado({
        idEmpleado: this.idEmpleado,
        Nombres: empleadoForm.value.Nombres,
        Apellidos: empleadoForm.value.Apellidos,
        Cargo: empleadoForm.value.Cargo,
        // Email: empleadoForm.value.Email,
        Telefono: empleadoForm.value.Telefono,
        Direccion: empleadoForm.value.Direccion,
        idAmbiente: empleadoForm.value.idAmbiente,
      }).subscribe(
        res=>{
          this.success_message = 'Empleado actualizado correctamente.';
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
