import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import  Swal from "sweetalert2";

@Component({
  selector: 'app-empleado-index',
  templateUrl: './empleado-index.component.html',
  styleUrls: ['./empleado-index.component.css']
})
export class EmpleadoIndexComponent implements OnInit {
  public identity: any
  public empleados: any;
  public filtroText: any;

  p: number = 1;

  constructor(
    private _empleadoService: EmpleadoService,
    private _usarioService: UsuarioService,
    private _route: Router,
  ) { 
    this.identity = this._usarioService.getIdentity();
  }

  ngOnInit(): void {
    if(this.identity){
      this._empleadoService.get_empleados('').subscribe(
        res=>{
          this.empleados = res.empleados;
          // console.log("hola",this.empleados);
        },
        err=>{
  
        }
      );
    }else{
      this._route.navigate(['']);
    }

  }

  search(searchForm: any): void{//filtra con parametro

    this._empleadoService.get_empleados(searchForm.value.filtroText).subscribe(
      res=>{
        this.empleados = res.empleados;
        // console.log("hola",this.empleados);
      },
      err=>{

      }
    );
  }

  eliminar(idEmpleado: any){//resibe el id del registro que se quiere elimanar eliminar
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
        this._empleadoService.delete_empleado(idEmpleado).subscribe(
          res=>{
            this._empleadoService.get_empleados('').subscribe(
              res=>{
                this.empleados = res.empleados;
                // console.log("hola",this.empleados);
              },
              err=>{
        
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

}
