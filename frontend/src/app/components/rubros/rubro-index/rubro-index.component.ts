import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivoService } from 'src/app/services/activo.service';
import { RubroService } from 'src/app/services/rubro.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import  Swal from "sweetalert2";


//Cerrar mediante jQuery 
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-rubro-index',
  templateUrl: './rubro-index.component.html',
  styleUrls: ['./rubro-index.component.css']
})
export class RubroIndexComponent implements OnInit {
  public rubros: any;
  public identity: any

  p: number = 1;
  constructor(
    private _rubroService: RubroService,
    private _activoService: ActivoService,
    private _usarioService: UsuarioService,
    private _route: Router,
  ) { 
    this.identity = this._usarioService.getIdentity();
  }

  ngOnInit(): void {
    if(this.identity){
      this._activoService.get_Rubros().subscribe(
        res=>{
          this.rubros = res.rubros;
        },err=>{

        }
      );
    }else{
      this._route.navigate(['']);
    }
  }


  eliminar(idRubro: any){//resibe el id del registro que se quiere elimanar eliminar
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
        this._rubroService.delete_rubro(idRubro).subscribe(
          res=>{
            this._activoService.get_Rubros().subscribe(
              res=>{
                this.rubros = res.rubros;
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
