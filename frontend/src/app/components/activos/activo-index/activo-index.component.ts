import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/services/GLOBAL';//
import { ActivoService } from 'src/app/services/activo.service';//
import { Proveedor } from "../../../models/Proveedor";//
import { Rubro } from 'src/app/models/Rubro';//
import { TipoActivo } from 'src/app/models/TipoActivo';
import  Swal from "sweetalert2";
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import {jsPDF} from 'jspdf';//libreria de pdf
import html2canvas from 'html2canvas';
import * as printJS from 'print-js';
import { Baja } from 'src/app/models/Baja';
import { BajaService } from 'src/app/services/baja.service';

//Cerrar mediante jQuery 
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-activo-index',
  templateUrl: './activo-index.component.html',
  styleUrls: ['./activo-index.component.css']
})
export class ActivoIndexComponent implements OnInit {
  public identity: any
  public activos: any;
  public url: any;
  public filtroText: any;
  //Insertar y listar Proveedores, rubros, tipos de activos fijos
  public proveedor: any;
  public rubro: any;
  public _tipoactivo: any;

  public proveedores: any; //obtener las proveedor
  public rubros: any; //obtener las rubro
  public condiciones: any; //obtener las condicion
  public tipoactivo: any; //obtener el tipo de activo fijo

  public pdf: HTMLElement | null | any;
  public bajas: any;
  public fecha: any;
  public mywindow: any |null
  public idActivo: any
  p: number = 1;

  constructor(
    private _activoService: ActivoService,
    private _usarioService: UsuarioService,
    private _route: Router,
    private _bajaService: BajaService,
  ) { 
    this.identity = this._usarioService.getIdentity();
    this.url = GLOBAL.url;
    this.proveedor = new Proveedor(1,'','','');
    this.rubro = new Rubro(1,'',1,'',1,'');
    this._tipoactivo = new TipoActivo(1,'','');
    this.bajas = new Baja(0,'','',0);
    
    
  }

  imprimirLista(){
    this.fecha = new Date();
      printJS({
        font_size: '40pt',
        headerStyle:'font-weight: 300;',
        documentTitle: '_',
        header: '<img src="../../../../assets/img/fe y alegria.PNG" height="70" width="170" alt=""><center><p>INVENTARIO DE ACTIVOS FIJOS Y ENSERES<br>PRACTICADO AL: '+this.fecha.toLocaleDateString()+'</p></center><p>Listado de activos fijos:<p/>',
        // header: '<img src="../../../../assets/img/fe y alegria.PNG" height="70" width="150" alt=""><center>INVENTARIO DE ACTIVOS FIJOS Y ENSERES</center><div class="row"><h4 class="custom-h3 title" class="centrado">hola</h4><h4></h4></div><p>hola<br>'+this.activos[0].Nombre+'</p>',
        printable: this.activos,
        type: 'json',
        properties: [{field:'idActivo', displayName: 'Codigo'},   
        {field:'NombreActivo', displayName: 'Tipo'},
        {field:'Descripcion', displayName: 'Descripción'},
        {field:'Nombre', displayName: 'Condición'},
        {field:'Procedencia', displayName: 'Procedencia'},
        {field:'Garantia', displayName: 'Nª Garantia'},
        {field:'Observaciones', displayName: 'Observaciones'}],
        
        style: '.custom-h3 { color: red;}',
        gridHeaderStyle: ' background:blue; border: 2px solid black;',//caberesera
        gridStyle: 'border: 1px solid black; '//contenido

      })
    
  }

  ngOnInit(): void {
    if(this.identity){
      this._activoService.get_activos('').subscribe(
        response=>{
          this.activos = response.activos;
          // console.log(this.activos);
        },
        error=>{
  
        }
      );
  
      this._activoService.get_Proveedores().subscribe(
        response=>{
          this.proveedores = response.proveedor;
        },
        error=>{
  
        }
      )
  
      this._activoService.get_TipoActivo().subscribe(
        response=>{
          this.tipoactivo = response.tipoactivo;
          // console.log(this.condiciones);
        },
        error=>{
  
        }
      )
  
      this._activoService.get_Condiciones().subscribe(
        response=>{
          this.condiciones = response.condicion;
          // console.log(this.condiciones);
        },
        error=>{
  
        }
      )
  
      this._activoService.get_Rubros().subscribe(
        response=>{
          this.rubros = response.rubros;
          // console.log(this.rubros);
        },
        error=>{
  
        }
      )
    }else{
      this._route.navigate(['']);
    }
  }

  search(searchForm: any): void{//filtra con parametro
    this._activoService.get_activos(searchForm.value.filtroText).subscribe(
      response=>{
        this.activos = response.activos;
      },
      error=>{

      }
    );
  }

  save_proveedor(proveedorForm: any){
    if(proveedorForm.valid){
      // console.log(proveedorForm.value);
      this._activoService.insert_proveedor({
        NombreProv: proveedorForm.value.NombreProv,
        DireccionProv: proveedorForm.value.DireccionProv,
        TelefonoProv: proveedorForm.value.TelefonoProv,
      }).subscribe(
        response=>{
          this._activoService.get_Proveedores().subscribe(
            response=>{
              this.proveedores = response.proveedor;
              this.proveedor = new Proveedor(1,'','','');
              $('#modal-save-proveedor').modal('hide');
            },
            error=>{
      
            }
          )
        },
        error=>{

        }
      )
    }
  }


  eliminar(idActivo: any){//resibe el id del registro que se quiere elimanar eliminar
    Swal.fire({
      title: 'Estas seguro de eliminarlo?',
      text: "Eliminación!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Registro eliminado!',
          'Se elimino correctamente.',
          'success'
        )
        this._activoService.deltete_activo(idActivo).subscribe(
          res=>{
            this._activoService.get_activos('').subscribe(
              response=>{
                this.activos = response.activos;
                // console.log(this.activos);
              },
              error=>{
        
              }
            );
          },
          err=>{
            
          }
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'Se cancelo la solicitud:)',
          'error'
        )
      }
    })
  }

  get_id(idActivo: any){
    this.idActivo = idActivo;
  }
  save_baja(bajaForm: any){
    if(bajaForm.valid){
      this._bajaService.insert_baja({
        CodActivo: this.idActivo,
        Motivo: bajaForm.value.Motivo,
      }).subscribe(
        res=>{
          this._activoService.get_activos('').subscribe(
            response=>{
              this.activos = response.activos;
              $('.modal').modal('hide');
              // console.log(this.activos);
            },
            error=>{
      
            }
          );
        },err=>{

        }
      );
    }
  }

}
