import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import  Swal from "sweetalert2";

@Component({
  selector: 'app-proyecto-index',
  templateUrl: './proyecto-index.component.html',
  styleUrls: ['./proyecto-index.component.css']
})
export class ProyectoIndexComponent implements OnInit {
  public identity: any
  public proyectos: any;
  public filtroText: any;

  p: number = 1;
  constructor(
    private _usarioService: UsuarioService,
    private _route: Router,
    private _proyectoService: ProyectoService,
  ) {
    this.identity = this._usarioService.getIdentity();
   }

  ngOnInit(): void {
    if(this.identity){
      this._proyectoService.get_proyectos('').subscribe(
        res=>{
          this.proyectos = res.proyectos
        },err=>{

        }
      );
    }else{
      this._route.navigate(['']);
    }
  }

  search(searchForm:any){
    this._proyectoService.get_proyectos(searchForm.value.filtroText).subscribe(
      res=>{
        this.proyectos = res.proyectos
      },err=>{

      }
    );
  }

  eliminar(idProyecto: any){//resibe el id del registro que se quiere elimanar eliminar
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
          this._proyectoService.delete_edificio(idProyecto).subscribe(
            res=>{
              this._proyectoService.get_proyectos('').subscribe(
                res=>{
                  this.proyectos = res.proyectos
                },err=>{
        
                }
              );
            },err=>{

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

}
