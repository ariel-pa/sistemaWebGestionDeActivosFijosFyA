import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Proyecto } from "../../../models/Proyecto";
import { Programa } from "../../../models/Programa";

@Component({
  selector: 'app-proyecto-edit',
  templateUrl: './proyecto-edit.component.html',
  styleUrls: ['./proyecto-edit.component.css']
})
export class ProyectoEditComponent implements OnInit {
  public proyecto: any;
  public programas: any;
  public identity: any;
  public idProyecto: any;

  public success_message: any;
  public error_message: any;
  constructor(
    private _usarioService: UsuarioService,
    private _routes: Router,
    private _route: ActivatedRoute,
    private _proyectoService: ProyectoService,
  ) { 
    this.identity = this._usarioService.getIdentity();
    this.proyecto = new Proyecto(0,'','','',0);
    // this.programas = new Programa(0,'');
  }

  ngOnInit(): void {
    if(this.identity){
      this._route.params.subscribe(
        params=>{
          this.idProyecto = params['id'];
          this._proyectoService.get_ProyectoById(this.idProyecto).subscribe(
            res=>{
              this.proyecto = res.proyecto[0];
            },err=>{

            }
          );
        },err=>{

        }
      );

      this._proyectoService.get_Programas('').subscribe(
        res=>{
          this.programas = res.programa;
        },err=>{

        }
      );
    }else{
      this._routes.navigate(['']);
    }
  }

  onSubmit(proyectoForm: any){
    if(proyectoForm.valid){
      this._proyectoService.update_Proyecto({
        idProyecto: this.idProyecto,
        NombrePro: proyectoForm.value.NombrePro,
        FechaInicio: proyectoForm.value.FechaInicio,
        FechaFin: proyectoForm.value.FechaFin,
        idPrograma: proyectoForm.value.idPrograma
      }).subscribe(
        res=>{
          this.success_message = 'Proyecto actualizado correctamente.';
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
