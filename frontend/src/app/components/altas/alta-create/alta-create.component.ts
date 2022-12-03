import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activo } from 'src/app/models/Activo';
import { ActivoService } from 'src/app/services/activo.service';
import { AltaService } from 'src/app/services/alta.service';
import { EdificioService } from 'src/app/services/edificio.service';
import { GLOBAL } from 'src/app/services/GLOBAL';//
import { UsuarioService } from 'src/app/services/usuario.service';


declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-alta-create',
  templateUrl: './alta-create.component.html',
  styleUrls: ['./alta-create.component.css']
})
export class AltaCreateComponent implements OnInit {
  public alta: any;
  public empleado: any={};
  public edificios: any={};
  public ambientes: any={};
  public proyectos: any={};
  public activos: any;
  public identity: any
  public url: any;
  public filtroText: any;
  public idActivo: any;//obtener id para dar de alta
  public idEdificio: any;
  public condiciones: any; //obtener las condicion
  p: number = 1;
  constructor(
    private _route: Router,
    private _altaService: AltaService,
    private _activoService: ActivoService,
    private _usuarioService: UsuarioService,
    private _edificioService: EdificioService,
  ) { 
    this.url = GLOBAL.url;
    this.activos = new Activo(1,1,'','','',1,'',1,1,1);
    this.identity = this._usuarioService.getIdentity();
  }

  ngOnInit(): void {
    if(this.identity){
      this._altaService.get_activosAlta('').subscribe(
        response=>{
          this.activos = response.activos;
          // console.log(this.activos);
        },
        error=>{
  
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
  
      // this._altaService.get_ambiente().subscribe(
      //   res=>{
      //     this.ambientes = res.ambientes;
      //   },err=>{
  
      //   }
      // );
  
      this._altaService.get_proyecto().subscribe(
        res=>{
          this.proyectos = res.proyectos;
        },err=>{
  
        }
      );
  
      this._usuarioService.get_empleados('').subscribe(
        res=>{
          this.empleado = res.empleados;
        },
        err=>{
  
        }
      );

      this._edificioService.get_edificios('').subscribe(
        res=>{
          this.edificios = res.edificios;
          // console.log(this.edificios);
        },err=>{

        }
      );
    }else{
      this._route.navigate(['']);
    }

  }

 search(searchForm: any): void{//filtra con parametro
    this._altaService.get_activosAlta(searchForm.value.filtroText).subscribe(
      response=>{
        this.activos = response.activos;
      },
      error=>{

      }
    );
  }

  get_id(id: any){
    this.idActivo = id;
    // console.log(id);
  }
  id_Edificio(idEdificio: any){
    if(idEdificio != undefined){
      this._altaService.get_EdificioAmbienteById(idEdificio).subscribe(
        res=>{
          this.ambientes = res.ambientes;
          // console.log(this.ambientes);
        },err=>{

        }
      )
    }
  }


  alta_activo(altaForm: any){
    if(altaForm.valid){
      // console.log(altaForm.value);
      this._altaService.insert_altaActivo({
        CodActivo: this.idActivo,
        CodEmpleado: altaForm.value.idEmpleado,
        CodAmbiente: altaForm.value.idAmbiente,
        CodProyecto: altaForm.value.idProyecto,
      }).subscribe(
        res=>{
          this._altaService.get_activosAlta('').subscribe(
            response=>{
              this.activos = response.activos;
              
              // this.sleep(500).then(() => this._route.navigate(['altas']));
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

  sleep(milliseconds : number) {
    return new Promise(resolve => setTimeout( resolve, milliseconds));
  }
}
