import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepreciacionService } from 'src/app/services/depreciacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as printJS from 'print-js'

@Component({
  selector: 'app-depreciacion-detalle',
  templateUrl: './depreciacion-detalle.component.html',
  styleUrls: ['./depreciacion-detalle.component.css']
})
export class DepreciacionDetalleComponent implements OnInit {
  public activofijo:any;
  public depreciacion: any;
  public identity: any;
  public idActivo: any={};
  public csvData: any=[];
  public Columns: any=[];

  p: number = 1;
  constructor(
    private _routes: Router,
    private _route: ActivatedRoute,
    private _activoDepService: DepreciacionService, 
    private _usuarioService: UsuarioService,
  ) { 
    this.identity = this._usuarioService.getIdentity();
    this.Columns = [
      {feild:'Fecha', header:'Fecha'},
      {feild:'ValorContabilizado', header:'Valor contabilizado'},
      {feild:'FactorActual', header:'Factor actual'},
      {feild:'IncrementoActual', header:'Incremento actual'},
      {feild:'DepreciacionPeriodo', header:'Depreciación por periodo'},
      {feild:'ValorNeto', header:'Valor Neto'},
    ]
  }

  ngOnInit(): void {
    if(this.identity.Rol=== 'ADMIN'){
      this._route.params.subscribe(
        params=>{
          this.idActivo = params['id'];
          this._activoDepService.get_DataDepreciacion(this.idActivo).subscribe(
            res=>{
              this.activofijo = res.activofijo[0];
              this.depreciacion = res.depreciacion;
              console.log(this.depreciacion);
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

  exportCSV(){
    const header: any[] = []
    this.Columns.forEach((selectedColumn: any) => {
      header.push(selectedColumn.feild);
    });
    this.downloadFile(this.depreciacion,header,'ReporteCSV');
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

  
  imprimirLista(){
    printJS({
      font_size: '40pt',
      headerStyle:'font-weight: 300;',
      documentTitle: '_',
      header: '<img src="../../../../assets/img/fe y alegria.PNG" height="70" width="170" alt=""><center><b><p>REPORTE DE ACTIVO FIJO DEPRECIADO</p></b></center><p><b>Codigo activo fijo:</b> '+this.activofijo.idActivo+'<br><b>Tipo de activo fijo:</b> '+this.activofijo.NombreActivo+'<br><b>Descripción:</b> '+this.activofijo.Descripcion+'<p/><p>Lista de depreciación del activo fijo:<p/>',
      // header: '<img src="../../../../assets/img/fe y alegria.PNG" height="70" width="170" alt="">',
      printable: this.depreciacion,
      type: 'json',
      properties: [
      // {field:'Fecha', displayName: 'Fecha'},   
      {field:'ValorContabilizado', displayName: 'Valor Contabilizado(Bs)'},
      {field:'FactorActual', displayName: 'Factor Actual(Bs)'},
      {field:'IncrementoActual', displayName: 'Incremento Actual(Bs)'},
      {field:'DepreciacionPeriodo', displayName: 'Depreciacion Periodo(Bs)'},
      {field:'ValorNeto', displayName: 'Valor Neto(Bs)'},
      // {field:'NombrePro', displayName: 'Proyecto'}
      ],
      
      style: '.custom-h3 { color: red;}',
      gridHeaderStyle: ' background:blue; border: 2px solid black;',//caberesera
      gridStyle: 'border: 1px solid black; '//contenido

    })

    // const doc = new jsPDF('p', 'pt', 'letter');
    // this.pdf= document.getElementById('listapdf');
    // doc.html(this.pdf, {
    //   margin:[40,60,40,60],
    //   callback: function(doc) {
    //     doc.save("Detalles.pdf");
    //   }
    // });

  }

}
