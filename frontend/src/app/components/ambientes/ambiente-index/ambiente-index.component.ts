import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AmbienteService } from 'src/app/services/ambiente.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import  Swal from "sweetalert2";

@Component({
  selector: 'app-ambiente-index',
  templateUrl: './ambiente-index.component.html',
  styleUrls: ['./ambiente-index.component.css']
})
export class AmbienteIndexComponent implements OnInit {

  public ambientes: any;
  public identity: any
  public filtroText: any;

  p: number = 1;
  constructor(
    private _ambienteService: AmbienteService,
    private _usarioService: UsuarioService,
    private _route: Router,
  ) { 
    this.identity = this._usarioService.getIdentity();
  }

  ngOnInit(): void {
    if(this.identity){
      this._ambienteService.get_ambientes('').subscribe(
        res=>{
          this.ambientes = res.ambientes;
        },err=>{

        }
      );
    }else{
      this._route.navigate(['']);
    }
  }

  search(searchForm:any){
    this._ambienteService.get_ambientes(searchForm.value.filtroText).subscribe(
      res=>{
        this.ambientes = res.ambientes;
      },err=>{

      }
    );
  }

  eliminar(idAmbiente: any){//resibe el id del registro que se quiere elimanar eliminar
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
          this._ambienteService.delete_ambiente(idAmbiente).subscribe(
            res=>{
              this._ambienteService.get_ambientes('').subscribe(
                res=>{
                  this.ambientes = res.ambientes;
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
