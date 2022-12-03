import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import  Swal from "sweetalert2";

@Component({
  selector: 'app-proveedor-index',
  templateUrl: './proveedor-index.component.html',
  styleUrls: ['./proveedor-index.component.css']
})
export class ProveedorIndexComponent implements OnInit {

  public proveedores: any;
  public identity: any
  public filtroText: any;
  p: number = 1;
  constructor(
    private proveedoreService: ProveedorService,
    private _usarioService: UsuarioService,
    private _route: Router,
  ) { 
    this.identity = this._usarioService.getIdentity();
  }

  ngOnInit(): void {
    if(this.identity){
      this.proveedoreService.get_proveedor('').subscribe(
        res=>{
          this.proveedores = res.proveedor;
          // console.log(this.proveedores);
        },err=>{

        }
      );
    }else{
      this._route.navigate(['']);
    }
  }

  search(searchForm: any){
    this.proveedoreService.get_proveedor(searchForm.value.filtroText).subscribe(
      res=>{
        this.proveedores = res.proveedor;
        // console.log(this.proveedores);
      },err=>{

      }
    );
  }

  eliminar(idProveedor: any){//resibe el id del registro que se quiere elimanar eliminar
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
          this.proveedoreService.delete_proveedor(idProveedor).subscribe(
            res=>{
              this.proveedoreService.get_proveedor('').subscribe(
                res=>{
                  this.proveedores = res.proveedor;
                  // console.log(this.proveedores);
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
