import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activo } from 'src/app/models/Activo';
import { Devolucion } from 'src/app/models/Devolucion';
import { Mantenimineto } from 'src/app/models/Mantenimiento';
import { ActivoService } from 'src/app/services/activo.service';
import { AltaService } from 'src/app/services/alta.service';
import { DevolucionService } from 'src/app/services/devolucion.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as printJS from 'print-js';

declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-alta-asignacion',
  templateUrl: './alta-asignacion.component.html',
  styleUrls: ['./alta-asignacion.component.css']
})
export class AltaAsignacionComponent implements OnInit {

  title = 'gmaps'; 
  

  label = {
    color: 'red',
    text: 'Marcador'
  };
  public position: any;
  public latitud: any;
  public longitud: any;

  public altas: any;
  public activo: any;
  public identity: any;
  public filtroText: any;
  public filtroTextF: any;
  public mantenimiento: any;
  public condiciones: any;
  public devoluciones: any;
  public url: any;
  public idActivo: any;
  public fecha: any;
  p: number = 1; 
  constructor(
    private _route: Router,
    private _mantenimientoService: MantenimientoService,
    private _devolucionService: DevolucionService,
    private _activoService: ActivoService,
    private _usuarioService: UsuarioService,
    private _altasService: AltaService,
  ) {
    this.identity = this._usuarioService.getIdentity();
    this.activo = new Activo(1,1,'','','',1,'',1,1,1);
    this.devoluciones= new Devolucion(0,0,0,0,'','','','');
    this.mantenimiento= new Mantenimineto(0,'','',0,0);
    this.url = GLOBAL.url;
   }

  ngOnInit(): void {
    if(this.identity){
      this._altasService.get_Altas('').subscribe(
        res=>{
          this.altas = res.altas;
          // console.log("hola",this.altas);
        },err=>{

        }
      );

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
  get_maps(idActivo: any, latitud: any, longitud: any){
    this.idActivo = idActivo;
    this.position = {
      lat: latitud,
      lng: longitud
    };
    // console.log("hola",latitud);Ç
  }
  get_id(idActivo: any){
    this.idActivo = idActivo;
  }
  search(searchForm: any){
    console.log(searchForm.value.filtroText);
    this._altasService.get_Altas(searchForm.value.filtroText).subscribe(
      res=>{
        this.altas = res.altas;
        // console.log(this.altas);
      },err=>{

      }
    );
  }
  searchFech(searchFormFech: any){
    const fecha_path = searchFormFech.value.filtroTextF;
    const name = fecha_path.split('T');
    const fecha = name[0];
    this._altasService.get_AltasFiltroFecha(fecha).subscribe(
      res=>{
        this.altas = res.altas;
        // console.log(this.altas);
      },err=>{

      }
    );
  }

  save_mantenimiento(mantenimientoForm: any){
    if(mantenimientoForm.valid){
      this._mantenimientoService.insert_mantenimiento({
        FechaMant: mantenimientoForm.value.FechaMant,
        Informe: mantenimientoForm.value.Informe,
        Costo: mantenimientoForm.value.Costo,
        idAct: this.idActivo
      }).subscribe(
        res=>{
          this._altasService.get_Altas('').subscribe(
            res=>{
              this.altas = res.altas;
              $('.modal').modal('hide');
              // console.log(this.altas);
            },err=>{
    
            }
          );
        },err=>{

        }
      );
    }
  }

  save_devolucion(devolucionForm: any){
    if(devolucionForm.valid){
      // console.log(devolucionForm.value);
      this._devolucionService.insert_devolucion({
        CodActivo: this.idActivo,
        CodCondicion: devolucionForm.value.idCondicion,
        Motivo: devolucionForm.value.Motivo,
        Observaciones: devolucionForm.value.Observaciones,
      }).subscribe(
        res=>{
          this._altasService.get_Altas('').subscribe(
            res=>{
              this.altas = res.altas;
              $('.modal').modal('hide');
              // console.log(this.altas);
            },err=>{
    
            }
          );    
        },err=>{

        }
      );
    }
  }

  imprimirLista(){
    this.fecha = new Date();
      printJS({
        font_size: '40pt',
        headerStyle:'font-weight: 300;',
        documentTitle: '_',
        header: `<img src="../../../../assets/img/fe y alegria.PNG" height="70" width="170" alt=""><center><p>LISTADO DE ACTIVOS FIJOS ASIGNADOS<br>PRACTICADO EL: ${this.fecha.toLocaleDateString()}</p></center>
        
        <p>Listado de activos fijos:<p/>`,
        // <p><b>Proyecto:</b> ${this.altas[0].NombrePro}</p>
        printable: this.altas,
        type: 'json',
        properties: [{field:'Nombres', displayName: 'Responsable'},   
        {field:'Apellidos', displayName: 'Apellidos'},  
        {field:'Descripcion', displayName: 'Descripción'},
        {field:'Observaciones', displayName: 'Observaciones'},
        {field:'NombreAmb', displayName: 'Ambiente'},
        {field:'NombreEdi', displayName: 'Edificio'}
      ],
        
        style: '.custom-h3 { color: red;}',
        gridHeaderStyle: ' background:blue; border: 2px solid black;',//caberesera
        gridStyle: 'border: 1px solid black; '//contenido

      })
    
  }

}
