import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Edificio } from 'src/app/models/Edificio';
import { EdificioService } from 'src/app/services/edificio.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-edificio-edit',
  templateUrl: './edificio-edit.component.html',
  styleUrls: ['./edificio-edit.component.css']
})
export class EdificioEditComponent implements OnInit {
  public identity: any
  public edificio: any;
  public ubicaciones: any;
  public NombreLugar: any={};
  public idEdificio: any

  public success_message: any;
  public error_message: any;
  constructor(
    private _usarioService: UsuarioService,
    private _routes: Router,
    private _edificioService: EdificioService,
    private _route: ActivatedRoute,
  ) { 
    this.identity = this._usarioService.getIdentity();
    this.edificio = new Edificio(0,'','','',1);
    // this.ubicaciones = new Ubicacion(0,'');
  }

  ngOnInit(): void {
    if(this.identity){
      this._route.params.subscribe(
        params=>{
          this.idEdificio = params['id'];
          this._edificioService.get_edificiosById(this.idEdificio).subscribe(
            res=>{
              this.edificio = res.edificio[0];
            },err=>{

            }
          );
        },err=>{

        }
      );

      this._edificioService.get_ubicacion('').subscribe(
        res=>{
          this.ubicaciones = res.ubicacion;
          // console.log(this.ubicaciones);
        },err=>{

        }
      );
    }else{
      this._routes.navigate(['']);
    }
  }

  onSubmit(edificioForm: any){
    if(edificioForm.valid){
      this._edificioService.update_edificio({
        idEdificio: this.idEdificio,
        NombreEdi: edificioForm.value.NombreEdi,
        Servicio: edificioForm.value.Servicio,
        Direccion: edificioForm.value.Direccion,
        idUbicacion: edificioForm.value.idUbicacion,
      }).subscribe(
        res=>{
          this.success_message = 'Edificio actualizado correctamente.';
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
