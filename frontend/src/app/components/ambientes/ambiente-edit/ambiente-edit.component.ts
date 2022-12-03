import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ambiente } from 'src/app/models/Ambiente';
import { Edificio } from 'src/app/models/Edificio';
import { AmbienteService } from 'src/app/services/ambiente.service';
import { EdificioService } from 'src/app/services/edificio.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-ambiente-edit',
  templateUrl: './ambiente-edit.component.html',
  styleUrls: ['./ambiente-edit.component.css']
})
export class AmbienteEditComponent implements OnInit {
  public idAmbiente: any;
  public edificios: any;
  public ambiente: any;
  public identity: any
  public success_message: any;
  public error_message: any;

  constructor(
    private _usarioService: UsuarioService,
    private _routes: Router,
    private _edificioService: EdificioService,
    private _ambienteService: AmbienteService,
    private _route: ActivatedRoute,
  ) { 
    this.identity = this._usarioService.getIdentity();
    this.edificios = new Edificio(0,'','','',1);
    this.ambiente = new Ambiente(0,'','',0);
  }

  ngOnInit(): void {
    if(this.identity){
      this._route.params.subscribe(
        params=>{
          this.idAmbiente = params['id'];
          this._ambienteService.get_ambienteById(this.idAmbiente).subscribe(
            res=>{
              this.ambiente =  res.ambiente[0];
            },err=>{

            }
          );
        },err=>{

        }
      );
      this._edificioService.get_edificios('').subscribe(
        res=>{
          this.edificios = res.edificios;
        },err=>{

        }
      );
    }else{
      this._routes.navigate(['']);
    }
  }

  onSubmit(ambienteForm: any){
    if(ambienteForm.valid){
      this._ambienteService.update_ambiente({
        idAmbiente: this.idAmbiente,
        NombreAmb: ambienteForm.value.NombreAmb,
        DescripcionAmb: ambienteForm.value.DescripcionAmb,
        idEdificio: ambienteForm.value.idEdificio,
      }).subscribe(
        res=>{
          this.success_message = 'Ambiente actualizado correctamente.';
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
