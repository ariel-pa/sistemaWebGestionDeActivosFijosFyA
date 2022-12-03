import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import { Empleado } from "../../../models/Empleado";

@Component({
  selector: 'app-empleado-creat',
  templateUrl: './empleado-creat.component.html',
  styleUrls: ['./empleado-creat.component.css']
})
export class EmpleadoCreatComponent implements OnInit {
  public identity: any
  public ambientes: any;
  public empleado: any;

  public success_message: any;
  public error_message: any;

  constructor(
    private _empleadoService: EmpleadoService,
    private _usarioService: UsuarioService,
    private _route: Router,
  ) { 
    this.identity = this._usarioService.getIdentity();
    this.empleado = new Empleado(1,'','','','','','',1);

  }

  ngOnInit(): void {
    if(this.identity){
        //Obtiene los ambientes
        this._empleadoService.get_ambiente().subscribe(
          response=>{
            // console.log(response);
            this.ambientes = response.ambientes;
          },
          error=>{
    
          }
        )
    }else{
      this._route.navigate(['']);
    }
  }

  success_alert(){
    this.success_message = ''; 
  }

  error_alert(){
    this.error_message = ''; 
  }

  onSubmit(empleadoForm: any){
    if(empleadoForm.valid){
      this._empleadoService.insert_empleado({
        Nombres: empleadoForm.value.Nombres,
        Apellidos: empleadoForm.value.Apellidos,
        Cargo: empleadoForm.value.Cargo,
        // Email: empleadoForm.value.Email,
        Telefono: empleadoForm.value.Telefono,
        Direccion: empleadoForm.value.Direccion,
        idAmbiente: empleadoForm.value.idAmbiente
      }).subscribe(
        res=>{
          this.success_message = 'Empleado registrado correctamente.';
          this.empleado = new Empleado(1,'','','','','','',1);
          this.sleep(2000).then(() => this.success_message = '');
        },err=>{

        }
      );
    }else{
      this.error_message = 'Complete el formulario';
      this.sleep(2000).then(() => this.error_message = '');
    }
  }

  sleep(milliseconds : number) {
    return new Promise(resolve => setTimeout( resolve, milliseconds));
  }
}
