import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RubroService } from 'src/app/services/rubro.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Rubro } from 'src/app/models/Rubro';//

@Component({
  selector: 'app-rubro-create',
  templateUrl: './rubro-create.component.html',
  styleUrls: ['./rubro-create.component.css']
})
export class RubroCreateComponent implements OnInit {
  public usaurio: any;
  public rubros: any;
  public identity: any
  public Depreciable: any;

  public success_message: any;
  public error_message: any;

  constructor(
    private _rubroService: RubroService,
    private _usurioService: UsuarioService,
    private _route: Router,
  ) { 
    this.identity = this._usurioService.getIdentity();
    this.rubros = new Rubro(0,'',0,'',0,'');
  }

  ngOnInit(): void {
    if(this.identity){

    }else{
      this._route.navigate(['']);
    }
  }

  onSubmit(rubroForm: any){
    if(rubroForm.valid){
      this._rubroService.insert_rubro({
        Nombre: rubroForm.value.Nombre,
        VidaUtil: rubroForm.value.VidaUtil,
        Depreciable: rubroForm.value.Depreciable,
        CoeficienteD: rubroForm.value.CoeficienteD,
        Actualiza: rubroForm.value.Actualiza,
      }).subscribe(
        response=>{
          this.success_message = 'Rubro contable registrado correctamente.';
          this.rubros = new Rubro(0,'',0,'',0,'');
          this.sleep(2000).then(() => this.success_message = '');
        },
        error=>{

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
