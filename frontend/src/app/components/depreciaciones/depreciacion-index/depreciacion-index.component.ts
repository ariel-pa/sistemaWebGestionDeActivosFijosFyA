import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activo } from 'src/app/models/Activo';
import { DepreciacionService } from 'src/app/services/depreciacion.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { RevalorizacionService } from 'src/app/services/revalorizacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-depreciacion-index',
  templateUrl: './depreciacion-index.component.html',
  styleUrls: ['./depreciacion-index.component.css']
})
export class DepreciacionIndexComponent implements OnInit {
  public activos: any;
  public identity: any;
  public UfvInicial: any;

  public filtroText: any;
  public idActivo: any;//obtener id para dar de alta

  public depreciaciones: any;
  public revalorizacion: any;
  public csvData: any=[];
  public Columns: any=[];
  public url: any;

  p: number = 1;
  constructor(
    private _route: Router,
    private _activoDepService: DepreciacionService, 
    private _revalorizacionService: RevalorizacionService,
    private _usuarioService: UsuarioService,
  ) {
    this.url = GLOBAL.url;
    this.identity = this._usuarioService.getIdentity();
    this.activos = new Activo(1,1,'','','',1,'',1,1,1);
    this.Columns = [
      {feild:'Fecha', header:'Fecha'},
      {feild:'ValorContabilizado', header:'Valor contabilizado'},
      {feild:'FactorActual', header:'Factor actual'},
      {feild:'IncrementoActual', header:'Incremento actual'},
      {feild:'DepreciacionPeriodo', header:'Depreciación por periodo'},
      {feild:'ValorNeto', header:'Valor Neto'},
      {feild:'idActivo', header:'Codigo'},
    ]
   }

  ngOnInit(): void {
    if(this.identity.Rol=== 'ADMIN'){
      this._activoDepService.get_activosDepreciables('').subscribe(
        response=>{
          this.activos = response.activos;
        },
        error=>{
  
        }
      );

      this._activoDepService.get_Depreciaciones().subscribe(
        res=>{
          this.depreciaciones = res.depreciaciones;
          console.log(this.depreciaciones);
        },err=>{

        }
      );
    }else{
      this._route.navigate(['']);
    }
  }

  search(searchForm: any): void{//filtra con parametro
    this._activoDepService.get_activosDepreciables(searchForm.value.filtroText).subscribe(
      response=>{
        this.activos = response.activos;
      },
      error=>{

      }
    );
  }

  get_idufv(id: any, UfvInicial: any){
    this.idActivo = id;
    this.UfvInicial = UfvInicial
  }
  depreciar_activo(depreciarForm: any){
    if(depreciarForm.valid){
      let fecha = depreciarForm.value.fecha;
      fecha = fecha.split('T');//diviir la fecha

      this._activoDepService.insert_Depreciacion({
        // CodActivo: this.idActivo,
        UfvAct: depreciarForm.value.ufvactual,
        // UfvIn: this.UfvInicial,
        FechaDepreciacion: fecha[0]
      }).subscribe(
        res=>{
          this._activoDepService.get_activosDepreciables('').subscribe(
            response=>{
              this.activos = response.activos;
              $('.modal').modal('hide');
            },
            error=>{
      
            }
          );
        },err=>{

        }
      );
    }
    
  }

  save_revalorizacion(revalorizacionForm: any){
    if(revalorizacionForm.valid){
      let fecha = revalorizacionForm.value.fecha;
      fecha = fecha.split('T');//diviir la fecha
      this._revalorizacionService.insert_Revalorizacion({
        CodActivo: this.idActivo,
        FechaRevalorizacion: revalorizacionForm.value.fecha,
        Valor: revalorizacionForm.value.ValorNuevo,
        Descripcion: revalorizacionForm.value.Descripcion,
      }).subscribe(
        res=>{
          this._activoDepService.get_activosDepreciables('').subscribe(
            response=>{
              this.activos = response.activos;
              $('.modal').modal('hide');
            },
            error=>{
      
            }
          );
        },err=>{

        }
      );
    }
  }

  sleep(milliseconds : number) {
    return new Promise(resolve => setTimeout( resolve, milliseconds));
  }

  exportCSV(){
    const fecha = new Date();
    const header: any[] = []
    this.Columns.forEach((selectedColumn: any) => {
      header.push(selectedColumn.feild);
    });
    this.downloadFile(this.depreciaciones,header,`${fecha.getDate()}-${fecha.getMonth()+1}-${fecha.getFullYear()}-ReporteActivosFijosCSV`);
  }
  downloadFile(data:unknown, columnHeaders:string[], filename: string) {    
    let csvData = this.ConvertToCSV(data, columnHeaders);
    let blob = new Blob(['﻿' + csvData], {
      type: 'text/csv;charset=utf-8;',
    });
    let dwldLink = document.createElement('a');
    let url = URL.createObjectURL(blob);
    let isSafariBrowser =
      navigator.userAgent.indexOf('Safari') != -1 &&
      navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {      
      dwldLink.setAttribute('target', '_blank');
    }
    dwldLink.setAttribute('href', url);
    dwldLink.setAttribute('download', filename + '.csv');
    dwldLink.style.visibility = 'hidden';
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  ConvertToCSV(objArray:any, headerList:string[]) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row:string = '';

    for (let index in headerList) {
      row += headerList[index] + ';';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line =(i+1)+ '';
      for (let index in headerList) {
        let head = headerList[index];
        line += array[i][head] + ';';
      }
      str += line + '\r\n';
    }
    return str;
  }
}
