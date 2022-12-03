import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepreciacionService } from 'src/app/services/depreciacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import  Swal from "sweetalert2";

declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-valordepreciacion-index',
  templateUrl: './valordepreciacion-index.component.html',
  styleUrls: ['./valordepreciacion-index.component.css']
})
export class ValordepreciacionIndexComponent implements OnInit {
  public valordepreciacion: any;
  public identity: any;
  p: number = 1;
  constructor(
    private _usuarioService: UsuarioService,
    private _route: Router,
    private _valorDepreciacionService: DepreciacionService,
  ) { 
    this.identity = this._usuarioService.getIdentity();
  }

  ngOnInit(): void {
    if(this.identity.Rol=== 'ADMIN'){
      this._valorDepreciacionService.get_ValorDepreciacion().subscribe(
        res=>{
          // console.log("hola",res)
          this.valordepreciacion = res.valor;
        },err=>{

        }
      );
    }else{
      this._route.navigate(['']);
    }
  }
  save_valor(valorForm: any){
    if(valorForm.valid){
      this._valorDepreciacionService.insert_ValorDepreciacion({
        Valor: valorForm.value.Valor
      }).subscribe(
        res=>{
          this._valorDepreciacionService.get_ValorDepreciacion().subscribe(
            res=>{
              this.valordepreciacion = res.valor;
              $('#modal-save-valor').modal('hide');
            },err=>{
    
            }
          );
        },err=>{

        }
      );
    }
  }
  eliminar(idValorDep: any){//resibe el id del registro que se quiere elimanar eliminar
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
          this._valorDepreciacionService.delete_ValorDepreciacion(idValorDep).subscribe(
            res=>{
              this._valorDepreciacionService.get_ValorDepreciacion().subscribe(
                res=>{
                  // console.log("hola",res)
                  this.valordepreciacion = res.valor;
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
