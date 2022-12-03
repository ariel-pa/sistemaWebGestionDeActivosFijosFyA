import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Edificio } from 'src/app/models/Edificio';
import { Ambiente } from 'src/app/models/Ambiente';
import { EdificioService } from 'src/app/services/edificio.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AmbienteService } from 'src/app/services/ambiente.service';

@Component({
  selector: 'app-ambiente-create',
  templateUrl: './ambiente-create.component.html',
  styleUrls: ['./ambiente-create.component.css']
})
export class AmbienteCreateComponent implements OnInit {
  public edificios: any;
  public ambiente: any;
  public identity: any
  public success_message: any;
  public error_message: any;
  constructor(
    private _usarioService: UsuarioService,
    private _route: Router,
    private _edificioService: EdificioService,
    private _ambienteService: AmbienteService,
  ) { 
    this.identity = this._usarioService.getIdentity();
    this.edificios = new Edificio(0,'','','',1);
    this.ambiente = new Ambiente(0,'','',0);
  }

  ngOnInit(): void {
    if(this.identity){
      this._edificioService.get_edificios('').subscribe(
        res=>{
          this.edificios = res.edificios;
        },err=>{

        }
      );
    }else{
      this._route.navigate(['']);
    }
  }

  onSubmit(ambienteForm: any){
    if(ambienteForm.valid){
      this._ambienteService.insert_ambiente({
        NombreAmb: ambienteForm.value.NombreAmb,
        DescripcionAmb: ambienteForm.value.DescripcionAmb,
        idEdificio: ambienteForm.value.idEdificio,
      }).subscribe(
        res=>{
          this.success_message = 'Ambiente registrado correctamente.';
          this.ambiente = new Ambiente(0,'','',0);
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
