import { Component, OnInit } from '@angular/core';
import { Proyecto } from "../../../models/Proyecto";
import { Programa } from "../../../models/Programa";
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { ProyectoService } from 'src/app/services/proyecto.service';

declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-proyecto-create',
  templateUrl: './proyecto-create.component.html',
  styleUrls: ['./proyecto-create.component.css']
})
export class ProyectoCreateComponent implements OnInit {
  public proyecto: any;
  public programas: any;
  public identity: any

  public success_message: any;
  public error_message: any;
  constructor(
    private _usarioService: UsuarioService,
    private _route: Router,
    private _proyectoService: ProyectoService,
  ) {
    this.identity = this._usarioService.getIdentity();
    this.proyecto = new Proyecto(0,'','','',0);
    this.programas = new Programa(0,'');
   }

  ngOnInit(): void {
    if(this.identity){
      this._proyectoService.get_Programas('').subscribe(
        res=>{
          this.programas = res.programa;
        },err=>{

        }
      );
    }else{
      this._route.navigate(['']);
    }
  }

  onSubmit(proyectoForm: any){
    if(proyectoForm.valid){
      this._proyectoService.insert_Proyecto({
        NombrePro: proyectoForm.value.NombrePro,
        FechaInicio: proyectoForm.value.FechaInicio,
        FechaFin: proyectoForm.value.FechaFin,
        idPrograma: proyectoForm.value.idPrograma
      }).subscribe(
        res=>{
          this.success_message = 'Proyecto registrado correctamente.';
          this.proyecto = new Proyecto(0,'','','',0);
          this.sleep(2000).then(() => this.success_message = '');
        },err=>{

        }
      );
    }else{
      this.error_message = 'Complete el formulario';
      this.sleep(2000).then(() => this.error_message = '');
    }
  }

  save_programa(programaForm: any){
    if(programaForm.valid){
      this._proyectoService.insert_Programa({
        NombreProg: programaForm.value.NombreProg
      }).subscribe(
        res=>{
          this._proyectoService.get_Programas('').subscribe(
            res=>{
              this.programas = res.programa;
              $('#modal-save-programa').modal('hide');
            },err=>{
    
            }
          );
        },err=>{

        }
      );
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
