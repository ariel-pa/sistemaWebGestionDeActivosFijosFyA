import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RubroService } from 'src/app/services/rubro.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-rubro-edit',
  templateUrl: './rubro-edit.component.html',
  styleUrls: ['./rubro-edit.component.css']
})
export class RubroEditComponent implements OnInit {

  public rubros: any;
  public identity: any
  public idRubro: any;

  public success_message: any;
  public error_message: any;

  constructor(
    private _rubroService: RubroService,
    private _usurioService: UsuarioService,
    private _routes: Router,
    private _route: ActivatedRoute,
  ) {
    this.identity = this._usurioService.getIdentity();
   }

  ngOnInit(): void {
    if(this.identity){
      this._route.params.subscribe(
        params=>{
          this.idRubro = params['id'];
          this._rubroService.get_rubroById(this.idRubro).subscribe(
            res=>{
              this.rubros = res.rubro[0];
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

  onSubmit(rubroForm: any){
    if(rubroForm.valid){
      this._rubroService.update_rubro({
        idRubro: this.idRubro,
        Nombre: rubroForm.value.Nombre,
        VidaUtil: rubroForm.value.VidaUtil,
        Depreciable: rubroForm.value.Depreciable,
        CoeficienteD: rubroForm.value.CoeficienteD,
        Actualiza: rubroForm.value.Actualiza,
      }).subscribe(
        response=>{
          this.success_message = 'Rubro contable actualizado correctamente.';
          // this.rubros = new Rubro(0,'',0,'',0,'');
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
