import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoService } from 'src/app/services/tipo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TipoActivo } from 'src/app/models/TipoActivo';

@Component({
  selector: 'app-tipobien-create',
  templateUrl: './tipobien-create.component.html',
  styleUrls: ['./tipobien-create.component.css']
})
export class TipobienCreateComponent implements OnInit {

  public tipoactivo: any;
  public identity: any
  public _tipo: any;

  public success_message: any;
  public error_message: any;
  constructor(
    private _tipoactivoService: TipoService,
    private _usarioService: UsuarioService,
    private _route: Router,
  ) { 
    this.identity = this._usarioService.getIdentity();
    this.tipoactivo = new TipoActivo(1,'','');
  }

  ngOnInit(): void {
    if(this.identity){

    }else{
      this._route.navigate(['']);
    }

  }

  onSubmit(tipoForm: any){
    if(tipoForm.valid){
      this._tipoactivoService.insert_tipo({
        NombreActivo: tipoForm.value.NombreActivo,
        DescripcionMant: tipoForm.value.DescripcionMant
      }).subscribe(
        res=>{
          this.success_message = 'Tipo de activo fijo registrado correctamente.';
          this.tipoactivo = new TipoActivo(1,'','');
          this.sleep(2000).then(() => this.success_message = '');
        },err=>{

        }
      );
    }else{
      this.error_message = 'Complete el formulario';
      this.sleep(2000).then(() => this.error_message = '');
    }
  }
  // onSubmit(tipoForm: any){
  //   if(tipoForm.valid){
  //     this._tipoactivoService.insert_tipo({
  //       Nombre: rubroForm.value.Nombre,
  //       VidaUtil: rubroForm.value.VidaUtil,
  //     }).subscribe(
  //       response=>{
  //         this.success_message = 'Rubro contable registrado correctamente.';
  //         this.rubros = new Rubro(0,'',0,'',0,'');
  //         this.sleep(2000).then(() => this.success_message = '');
  //       },
  //       error=>{

  //       }
  //     );
  //   }else{
  //     this.error_message = 'Complete el formulario';
  //     this.sleep(2000).then(() => this.error_message = '');
  //   }
  // }

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
