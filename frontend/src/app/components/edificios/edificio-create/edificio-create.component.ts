import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EdificioService } from 'src/app/services/edificio.service';
import { UsuarioService } from 'src/app/services/usuario.service';


import { Edificio } from "../../../models/Edificio";
import { Ubicacion } from "../../../models/Ubicacion";

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-edificio-create',
  templateUrl: './edificio-create.component.html',
  styleUrls: ['./edificio-create.component.css']
})
export class EdificioCreateComponent implements OnInit {
  public identity: any
  public edificio: any;
  public ubicaciones: any;
  public NombreLugar: any={};

  public success_message: any;
  public error_message: any;
  constructor(
    private _usarioService: UsuarioService,
    private _route: Router,
    private _edificioService: EdificioService,
  ) {
    this.identity = this._usarioService.getIdentity();
    this.edificio = new Edificio(0,'','','',1);
    this.ubicaciones = new Ubicacion(0,'');
   }

  ngOnInit(): void {
    if(this.identity){
      this._edificioService.get_ubicacion('').subscribe(
        res=>{
          this.ubicaciones = res.ubicacion;
          // console.log(this.ubicaciones);
        },err=>{

        }
      );
    }else{
      this._route.navigate(['']);
    }
  }

  onSubmit(edificioForm: any){
    if(edificioForm.valid){
      this._edificioService.insert_edificio({
        NombreEdi: edificioForm.value.NombreEdi,
        Servicio: edificioForm.value.Servicio,
        Direccion: edificioForm.value.Direccion,
        Latitud: edificioForm.value.Latitud,
        Longitud: edificioForm.value.Longitud,
        idUbicacion: edificioForm.value.idUbicacion,
      }).subscribe(
        res=>{
          this.success_message = 'Edificio registrado correctamente.';
          this.edificio = new Edificio(0,'','','',1);
          this.sleep(2000).then(() => this.success_message = '');
        },err=>{

        }
      );
    }else{
      this.error_message = 'Complete el formulario';
      this.sleep(2000).then(() => this.error_message = '');
    }
  }

  save_ubicacion(ubicacionForm: any){
    if(ubicacionForm.valid){
      this._edificioService.insert_ubicacion({
        NombreLugar: ubicacionForm.value.NombreLugar,
      }).subscribe(
        res=>{
          this._edificioService.get_ubicacion('').subscribe(
            res=>{
              this.ubicaciones = res.ubicacion;
              $('#modal-save-ubicacion').modal('hide');
              // console.log(this.ubicaciones);
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
