import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CantidadesService } from 'src/app/services/cantidades.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public identity: any;
  public disponibles: any;
  public mantenimientos: any;
  public asignados: any;
  public bajas: any;

  public req_mantenimiento: any;
  public depreciados: any;
  public edificios: any;
  public proyectos: any;
  public req_revalorizar: any;

  p: number = 1;
  constructor(
    private _route: Router,
    private _usarioService: UsuarioService,
    private _cantidadService: CantidadesService,
  ) { 
    this.identity = this._usarioService.getIdentity();
  }

  ngOnInit(): void {
    if(this.identity){
      this._cantidadService.get_asignados().subscribe(
        res=>{
          this.asignados = res.uso[0].Asignados;
          // console.log(this.asignados);
        },err=>{

        }
      );

      this._cantidadService.get_bajas().subscribe(
        res=>{
          this.bajas = res.baja[0].Baja;
          console.log(this.bajas);
        },err=>{

        }
      );
      this._cantidadService.get_disponibles().subscribe(
        res=>{
          this.disponibles = res.disponible[0].Disponibles;
        },err=>{

        }
      );

      this._cantidadService.get_mantenimiento().subscribe(
        res=>{
          this.mantenimientos = res.mantenimiento[0].Mantenimiento;
        },err=>{

        }
      );

      this._cantidadService.get_edificios().subscribe(
        res=>{
          this.edificios = res.edificios[0].edificios;
        },err=>{

        }
      );

      this._cantidadService.get_ProyectosEjecucion().subscribe(
        res=>{
          console.log(res);
          this.proyectos = res.proyectos;
        },err=>{

        }
      );

      this._cantidadService.get_depreciados().subscribe(
        res=>{
          this.depreciados = res.depreciados[0].cantDepreciados;
        },err=>{

        }
      );
    }else{
      this._route.navigate(['']);
    }
  }

}
