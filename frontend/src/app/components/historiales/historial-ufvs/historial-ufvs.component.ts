import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as printJS from 'print-js';
import { HistorialService } from 'src/app/services/historial.service';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-historial-ufvs',
  templateUrl: './historial-ufvs.component.html',
  styleUrls: ['./historial-ufvs.component.css']
})
export class HistorialUfvsComponent implements OnInit {

  public historialufvs: any;
  public identity: any;
  public filtroText: any;
  p: number = 1;
  constructor(
    private _usarioService: UsuarioService,
    private _route: Router,
    private _historialAltasService: HistorialService,
  ) { 
    this.identity = this._usarioService.getIdentity();
  }

  ngOnInit(): void {
    if(this.identity){
      this._historialAltasService.get_Ufvs('').subscribe(
       res=>{
         this.historialufvs = res.depreciaciones;
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
        `<img src="../../../../assets/img/fe y alegria.PNG" height="70" width="170" alt=""><center><b><p>HISTORIAL DE UFVS</p></b></center>`,
      
      printable: this.historialufvs,
      type: 'json',
      // repeatTableHeader:true,
      properties: [
        { field: 'Descripcion', displayName: 'Descripción' },
        { field: 'UfvInicial', displayName: 'Ufv anterior' },
        { field: 'UfvActual', displayName: 'Ufv actual' },
        { field: 'Fecha', displayName: 'Ufv actual' },
        
      ],

      style: '.custom-h3 { color: red;} .mi-div{height: 150px; !important}',
      gridHeaderStyle: ' background:blue; border: 2px solid black; ', //caberesera
      gridStyle: 'border: 1px solid black; ', //contenido,
    });
  }

  search(searchForm: any){
    this._historialAltasService.get_Ufvs(searchForm.value.filtroText).subscribe(
      res=>{
        this.historialufvs = res.depreciaciones;
      },err=>{

      }
     );
  }
}
