import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activo } from 'src/app/models/Activo';
import { Mantenimineto } from 'src/app/models/Mantenimiento';
import { ActivoService } from 'src/app/services/activo.service';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as printJS from 'print-js'
import  Swal from "sweetalert2";
import { GLOBAL } from 'src/app/services/GLOBAL';

declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-mantenimientos-index',
  templateUrl: './mantenimientos-index.component.html',
  styleUrls: ['./mantenimientos-index.component.css']
})
export class MantenimientosIndexComponent implements OnInit {
  public mantenimiento: any;
  public activo: any;
  public filtroText: any;
  public idActivo: any;
  public url: any;
  public identity: any;
  p: number = 1;
  constructor(
    private _route: Router,
    private _mantenimientoService: MantenimientoService,
    private _activoService: ActivoService,
    private _usuarioService: UsuarioService,
  ) { 
    this.identity = this._usuarioService.getIdentity();
    this.activo = new Activo(1,1,'','','',1,'',1,1,1);
    this.mantenimiento= new Mantenimineto(0,'','',0,0);
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

  ngOnInit(): void {
    if(this.identity){
      this._mantenimientoService.get_mantenimiento('').subscribe(
        res=>{
          this.mantenimiento = res.mantenimiento;
          // console.log(this.mantenimiento);
          
        },err=>{

        }
      );
    }else{
      this._route.navigate(['']);
    }
  }
  save_mantenimiento(mantenimientoForm: any){
    if(mantenimientoForm.valid){
      this._mantenimientoService.insert_mantenimiento({
        FechaMant: mantenimientoForm.value.FechaMant,
        Informe: mantenimientoForm.value.Informe,
        Costo: mantenimientoForm.value.Costo,
        idAct: mantenimientoForm.value.idAct
      }).subscribe(
        res=>{
          this._mantenimientoService.get_mantenimiento('').subscribe(
            res=>{
              this.mantenimiento = res.mantenimiento;
              $('.modal').modal('hide');
              // console.log(this.mantenimiento);
            },err=>{
    
            }
          );
        },err=>{

        }
      );
    }
  }
  imprimirLista(){
    printJS({
      font_size: '40pt',
      headerStyle:'font-weight: 300;',
      documentTitle: '_',
      header: '<img src="../../../../assets/img/fe y alegria.PNG" height="70" width="170" alt=""><center><b><p>REPORTE DE ACTIVOS FIJOS EN MANTENIMIENTO</p></b></center><p>Listado de activos fijos en mantenimiento:<p/>',
      // header: '<img src="../../../../assets/img/fe y alegria.PNG" height="70" width="170" alt="">',
      printable: this.mantenimiento,
      type: 'json',
      properties: [
      // {field:'Fecha', displayName: 'Fecha'},   
      {field:'idAct', displayName: 'Codigo'},
      {field:'NombreActivo', displayName: 'Tipo'},
      {field:'Descripcion', displayName: 'Descripción'},
      {field:'DescripcionMant', displayName: 'Mantenimiento'},
      {field:'Informe', displayName: 'Informe'},
      {field:'Costo', displayName: 'Costo'}
      ],
      
      style: '.custom-h3 { color: red;}',
      gridHeaderStyle: ' background:blue; border: 2px solid black;',//caberesera
      gridStyle: 'border: 1px solid black; '//contenido

    })

  }
  search(searchForm: any){
    this._mantenimientoService.get_mantenimiento(searchForm.value.filtroText).subscribe(
      res=>{
        this.mantenimiento = res.mantenimiento;
      },err=>{

      }
    );
  }

  concluir(idMant: any){
    
    Swal.fire('Mantenimiento concluido');
    this._mantenimientoService.delete_mantenimiento(idMant).subscribe(
      err=>{
        this._mantenimientoService.get_mantenimiento('').subscribe(
          res=>{
            this.mantenimiento = res.mantenimiento;
            
          },err=>{
  
          }
        );
      },res=>{
        this._route.navigate(['mantenimiento']);
      }
    );
  }
}
