import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoActivo } from 'src/app/models/TipoActivo';
import { TipoService } from 'src/app/services/tipo.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tipobien-edit',
  templateUrl: './tipobien-edit.component.html',
  styleUrls: ['./tipobien-edit.component.css']
})
export class TipobienEditComponent implements OnInit {
  public tipoactivo: any;
  public identity: any
  public _tipo: any;
  public idTipo: any;

  public success_message: any;
  public error_message: any;
  constructor(
    private _tipoactivoService: TipoService,
    private _usarioService: UsuarioService,
    private _routes: Router,
    private _route: ActivatedRoute,
  ) {
    this.identity = this._usarioService.getIdentity();
    this.tipoactivo = new TipoActivo(1,'','');
   }

  ngOnInit(): void {
    if(this.identity){
      this._route.params.subscribe(
        params=>{
          this.idTipo = params['id'];
          this._tipoactivoService.get_tipoById(this.idTipo).subscribe(
            res=>{
              this.tipoactivo = res.tipoactivo[0];
            },err=>{
    
            }
          );
        },err=>{

        }
      );
    }else{
      this._routes.navigate(['']);
    }
  }

  onSubmit(tipoForm: any){
    if(tipoForm.valid){
      console.log(tipoForm.value);
      this._tipoactivoService.update_tipo({
        idTipo: this.idTipo,
        NombreActivo: tipoForm.value.NombreActivo,
        DescripcionMant: tipoForm.value.DescripcionMant
      }).subscribe(
        res=>{
          this.success_message = 'Tipo de activo fijo actualizado correctamente.';
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
