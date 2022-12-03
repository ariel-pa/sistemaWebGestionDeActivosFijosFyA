import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activo } from 'src/app/models/Activo';
import { ActivoService } from 'src/app/services/activo.service';
import { RevalorizacionService } from 'src/app/services/revalorizacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-revalorizacion-index',
  templateUrl: './revalorizacion-index.component.html',
  styleUrls: ['./revalorizacion-index.component.css']
})
export class RevalorizacionIndexComponent implements OnInit {
  public revalorizacion: any;
  public activos: any;
  public filtroText: any;
  public identity: any
  public idActivo: any;
  public activo: any;

  p: number = 1;
  constructor(
    private _revalorizacionService: RevalorizacionService,
    private _usarioService: UsuarioService,
    private _route: Router,
    private _activoService: ActivoService,
  ) { 
    this.identity = this._usarioService.getIdentity();
    this.activo = new Activo(1,1,'','','',1,'',1,1,1);
  }

  get_id(idActivo: any){
    this.idActivo = idActivo;
    // console.log("hola",this.idActivo);
    this.activo = new Activo(1,1,'','','',1,'',1,1,1);
    this._activoService.get_activo(this.idActivo).subscribe(
      res=>{

        this.activo = res.activo[0];
        // console.log("hola",this.activo);
      },err=>{

      }
    );
  }
  ngOnInit(): void {
    if(this.identity){
      this._revalorizacionService.get_activosRevalorizados('').subscribe(
        res=>{
          this.activos = res.activos;
        },err=>{

        }
      );
    }else{
      this._route.navigate(['']);
    }
  }

  save_revalorizacion(revalorizacionForm: any){
    if(revalorizacionForm.valid){
      let fecha = revalorizacionForm.value.fecha;
      fecha = fecha.split('T');//diviir la fecha
      this._revalorizacionService.insert_Revalorizacion({
        CodActivo: revalorizacionForm.value.CodActivo,
        FechaRevalorizacion: revalorizacionForm.value.fecha,
        Valor: revalorizacionForm.value.ValorNuevo,
        Descripcion: revalorizacionForm.value.Descripcion,
      }).subscribe(
        res=>{
          
          this._revalorizacionService.get_activosRevalorizados('').subscribe(
            res=>{
              this.activos = res.activos;
              $('#modal-save-revalorizacion').modal('hide');
            },err=>{
    
            }
          );
        },err=>{

        }
      );
    }
  }

  search(searchForm: any){
    this._revalorizacionService.get_activosRevalorizados(searchForm.value.filtroText).subscribe(
      res=>{
        this.activos = res.activos;
      },err=>{

      }
    );
  }

}
