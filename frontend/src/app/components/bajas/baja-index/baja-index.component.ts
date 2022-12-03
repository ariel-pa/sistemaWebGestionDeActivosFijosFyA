import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BajaService } from 'src/app/services/baja.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Activo } from 'src/app/models/Activo';
import { Baja } from 'src/app/models/Baja';
import { ActivoService } from 'src/app/services/activo.service';
import * as printJS from 'print-js'
import { GLOBAL } from 'src/app/services/GLOBAL';

declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'app-baja-index',
  templateUrl: './baja-index.component.html',
  styleUrls: ['./baja-index.component.css']
})
export class BajaIndexComponent implements OnInit {
 public bajas: any;
 public identity: any
 public activo: any;
 public filtroText: any;
 public idActivo: any;
 public url: any;

 p: number = 1;
  constructor(
    private _bajaService: BajaService,
    private _usarioService: UsuarioService,
    private _route: Router,
    private _activoService: ActivoService,
  ) {
    this.identity = this._usarioService.getIdentity();
    this.url = GLOBAL.url;
    this.activo = new Activo(1,1,'','','',1,'',1,1,1);
    this.bajas = new Baja(0,'','',0);

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

  imprimirLista(){
    printJS({
      font_size: '40pt',
      headerStyle:'font-weight: 300;',
      documentTitle: '_',
      header: '<img src="../../../../assets/img/fe y alegria.PNG" height="70" width="170" alt=""><center><b><p>REPORTE DE ACTIVOS FIJOS DADOS DE BAJA</p></b></center><p>Listado de activos fijos dados de baja:<p/>',
      // header: '<img src="../../../../assets/img/fe y alegria.PNG" height="70" width="170" alt="">',
      printable: this.bajas,
      type: 'json',
      properties: [
      // {field:'Fecha', displayName: 'Fecha'},   
      {field:'Codigo', displayName: 'Codigo'},
      {field:'TipoActivoFijo', displayName: 'Tipo'},
      {field:'Descripcion', displayName: 'Descripción'},
      {field:'Nombre', displayName: 'Condición'},
      {field:'Motivo', displayName: 'Motivo de baja'},
      // {field:'NombrePro', displayName: 'Proyecto'}
      ],
      
      style: '.custom-h3 { color: red;}',
      gridHeaderStyle: ' background:blue; border: 2px solid black;',//caberesera
      gridStyle: 'border: 1px solid black; '//contenido

    })

  }
  ngOnInit(): void {
    if(this.identity){
      this._bajaService.get_baja('').subscribe(
        res=>{
          this.bajas = res.baja;
        },err=>{

        }
      );
    }else{
      this._route.navigate(['']);
    }
  }

  search(searchForm: any){
    this._bajaService.get_baja(searchForm.value.filtroText).subscribe(
      res=>{
        this.bajas = res.baja;
      },
      err=>{

      }
    );
  }

  save_baja(bajaForm: any){
    if(bajaForm.valid){
      this._bajaService.insert_baja({
        CodActivo: bajaForm.value.idActivo,
        Motivo: bajaForm.value.Motivo,
      }).subscribe(
        res=>{
          this._bajaService.get_baja('').subscribe(
            res=>{
              this.bajas = res.baja;
              $('.modal').modal('hide');
            },err=>{

            }
          );
        },err=>{

        }
      );
    }
  }

}
