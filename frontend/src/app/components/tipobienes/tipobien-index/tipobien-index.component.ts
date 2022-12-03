import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivoService } from 'src/app/services/activo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import  Swal from "sweetalert2";
//Cerrar mediante jQuery 
declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-tipobien-index',
  templateUrl: './tipobien-index.component.html',
  styleUrls: ['./tipobien-index.component.css']
})
export class TipobienIndexComponent implements OnInit {
  public tipoactivo: any;
  public identity: any
  public _tipo: any;

  p: number = 1;
  constructor(
    private _activoService: ActivoService,
    private _usarioService: UsuarioService,
    private _route: Router,
  ) { 
    this.identity = this._usarioService.getIdentity();
  }

  ngOnInit(): void {
    if(this.identity){
      this._activoService.get_TipoActivo().subscribe(
        response=>{
          this.tipoactivo = response.tipoactivo;
          // console.log(this.condiciones);
        },
        error=>{
  
        }
      );
    }else{
      this._route.navigate(['']);
    }

  }

  save_tipoactivo(tipoactivoForm: any){
    if(tipoactivoForm.valid){
      this._activoService.insert_tipoactivo({
        NombreActivo: tipoactivoForm.value.NombreActivo,
        DescripcionMant: tipoactivoForm.value.DescripcionMant,
      }).subscribe(
        response=>{
          this._activoService.get_TipoActivo().subscribe(
            response=>{
              this.tipoactivo = response.tipoactivo;  
              $('#modal-save-tipoactivo').modal('hide');
              // console.log(this.condiciones);
            },
            error=>{
      
            }
          )
        },
        error=>{

        }
      );
    }
  }

  eliminar(idTipo: any){//resibe el id del registro que se quiere elimanar eliminar
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
        this._activoService.deltete_tipoactivo(idTipo).subscribe(
          res=>{
            this._activoService.get_TipoActivo().subscribe(
              response=>{
                this.tipoactivo = response.tipoactivo;
                // console.log(this.condiciones);
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

  // editar(idTipo: any){
  //   this._activoService.get_tipoactivoId(idTipo).subscribe(
  //     res=>{
  //       this._tipo = res.tipoactivos;
  //     },err=>{

  //     }
  //   );
  // }

  // editar_tipoactivo(tipoactivoForm: any){

  // }
}
