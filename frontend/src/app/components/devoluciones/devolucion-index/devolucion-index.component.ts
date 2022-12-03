import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activo } from 'src/app/models/Activo';
import { ActivoService } from 'src/app/services/activo.service';
import { AltaService } from 'src/app/services/alta.service';
import { DevolucionService } from 'src/app/services/devolucion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as printJS from 'print-js';
import { GLOBAL } from 'src/app/services/GLOBAL';

declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-devolucion-index',
  templateUrl: './devolucion-index.component.html',
  styleUrls: ['./devolucion-index.component.css']
})
export class DevolucionIndexComponent implements OnInit {
  public identity: any
  public activo: any;
  public devoluciones: any
  public filtroText: any;
  public condiciones: any={}; //obtener las condicion
  public idActivo: any;
  
  public url: any;
  p: number = 1;
  constructor(
    private _devolucionService: DevolucionService,
    private _activoService: ActivoService,
    private _altaService: AltaService,
    private _usarioService: UsuarioService,
    private _route: Router,
  ) { 
    this.identity = this._usarioService.getIdentity();
    this.activo = new Activo(1,1,'','','',1,'',1,1,1);
    this.url = GLOBAL.url;
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
      header: '<img src="../../../../assets/img/fe y alegria.PNG" height="70" width="170" alt=""><center><b><p>REPORTE DE ACTIVOS FIJOS DEVUELTOS</p></b></center> <p><b>Listado de activos fijos:</b></p>',
      // header: '<img src="../../../../assets/img/fe y alegria.PNG" height="70" width="170" alt="">',
      printable: this.devoluciones,
      type: 'json',
      properties: [{field:'Nombres', displayName: 'Nombre'},   
      {field:'Apellidos', displayName: 'Apellido'},
      {field:'ActivoFijo', displayName: 'Activo Fijo'},
      {field:'Codigo', displayName: 'Codigo'},
      {field:'Condicion', displayName: 'Condición'},
      {field:'Observaciones', displayName: 'Observaciones'},
      {field:'Motivo', displayName: 'Motivo de Devolución'},
      {field:'NombrePro', displayName: 'Proyecto'},
      // {field:'FechaDevolucion', displayName: 'Fecha'}
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
  ngOnInit(): void {
    if(this.identity){
      this._devolucionService.get_devolucion('').subscribe(
        res=>{
          this.devoluciones = res.devolucion;
          console.log(this.devoluciones);
        },err=>{

        }
      );

      //Obtiene las condiciones
      this._activoService.get_Condiciones().subscribe(
        response=>{
          this.condiciones = response.condicion;
          // console.log(this.condiciones);
        },
        error=>{

        }
      );


    }else{
      this._route.navigate(['']);
    }
  }

  search(searchForm: any): void{//filtra con parametro

    this._devolucionService.get_devolucion(searchForm.value.filtroText).subscribe(
      res=>{
        this.devoluciones = res.devolucion;
        
      },
      err=>{

      }
    );
  }

  save_devolucion(devolucionForm: any){
    if(devolucionForm.valid){
      // console.log(devolucionForm.value);
      this._devolucionService.insert_devolucion({
        CodActivo: devolucionForm.value.idActivo,
        CodCondicion: devolucionForm.value.idCondicion,
        Motivo: devolucionForm.value.Motivo,
        Observaciones: devolucionForm.value.Observaciones,
      }).subscribe(
        res=>{
          this._devolucionService.get_devolucion('').subscribe(
            res=>{
              this.devoluciones = res.devolucion;
              $('.modal').modal('hide');
              // console.log(this.devoluciones);
            },err=>{
    
            }
          );
    
        },err=>{

        }
      );
    }
  }

}
