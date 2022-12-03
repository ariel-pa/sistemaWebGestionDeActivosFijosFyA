import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistorialService } from 'src/app/services/historial.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { GLOBAL } from 'src/app/services/GLOBAL';//

import * as printJS from 'print-js';
@Component({
  selector: 'app-historial-altas',
  templateUrl: './historial-altas.component.html',
  styleUrls: ['./historial-altas.component.css']
})
export class HistorialAltasComponent implements OnInit {
  public historialaltas: any;
  public identity: any;
  public filtroTextCod: any;
  public filtroText: any;
  public url: any;
  p: number = 1;

  constructor(
    // private _hitorialService:,
    private _usarioService: UsuarioService,
    private _route: Router,
    private _historialAltasService: HistorialService,
  ) {
    this.identity = this._usarioService.getIdentity();
    this.url = GLOBAL.url;
   }

  ngOnInit(): void {
    if(this.identity){
     this._historialAltasService.get_Altas('').subscribe(
      res=>{
        this.historialaltas = res.activos;
        console.log(this.historialaltas);
      },err=>{

      }
     );
    }else{
      this._route.navigate(['']);
    }

  }

  imprimirLista(){
    printJS({
      font_size: '40pt',
      headerStyle: 'font-weight: 300;',
      documentTitle: '_',
      header:
        `<img src="../../../../assets/img/fe y alegria.PNG" height="70" width="170" alt=""><center><b><p>HISTORIAL DE ACTIVOS FIJOS ASIGNADOS</p></b></center>`,
      
      printable: this.historialaltas,
      type: 'json',
      // repeatTableHeader:true,
      properties: [
        { field: 'Nombres', displayName: 'Nombre' },
        { field: 'Apellidos', displayName: 'Apellidos' },
        { field: 'CodActivo', displayName: 'Codigo activo fijo' },
        { field: 'Descripcion', displayName: 'Descripción' },
        { field: 'NombreAmb', displayName: 'Ambiente' },
        { field: 'NombreEdi', displayName: 'Edificio' },
        {field:'NombrePro', displayName: 'Proyecto'},
        { field: 'FechaHistorial', displayName: 'Fecha' },
        // {field:'NombrePro', displayName: 'Proyecto'}
      ],

      style: '.custom-h3 { color: red;} .mi-div{height: 150px; !important}',
      gridHeaderStyle: ' background:blue; border: 2px solid black; ', //caberesera
      gridStyle: 'border: 1px solid black; ', //contenido,
    });
  }

  search(searchForm: any){
    this._historialAltasService.get_Altas(searchForm.value.filtroText).subscribe(
      res=>{
        this.historialaltas = res.activos;
      },err=>{

      }
     );
  }

  searchCod(searchFormCod: any){
    this._historialAltasService.get_AltasCodigo(searchFormCod.value.filtroTextCod).subscribe(
      res=>{
        this.historialaltas = res.activos;
      },err=>{

      }
     );
  }
}
