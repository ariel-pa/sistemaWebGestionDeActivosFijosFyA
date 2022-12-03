import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EdificioService } from 'src/app/services/edificio.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import  Swal from "sweetalert2";

@Component({
  selector: 'app-edificio-index',
  templateUrl: './edificio-index.component.html',
  styleUrls: ['./edificio-index.component.css']
})
export class EdificioIndexComponent implements OnInit {

  public identity: any
  public edificios: any;
  public filtroText: any;

  p: number = 1;
  constructor(
    private _edificioService: EdificioService,
    private _usarioService: UsuarioService,
    private _route: Router,
  ) { 
    this.identity = this._usarioService.getIdentity();
  }

  ngOnInit(): void {
    if(this.identity){
      this._edificioService.get_edificios('').subscribe(
        res=>{
          this.edificios = res.edificios;
        },err=>{

        }
      );

    }else{
      this._route.navigate(['']);
    }
  }

  search(searchForm:any){
    this._edificioService.get_edificios(searchForm.value.filtroText).subscribe(
      res=>{
        this.edificios = res.edificios;
        
      },err=>{

      }
    );
  }

  eliminar(idEdificio: any){//resibe el id del registro que se quiere elimanar eliminar
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
        this._edificioService.delete_edificio(idEdificio).subscribe(
          res=>{
            this._edificioService.get_edificios('').subscribe(
              res=>{
                this.edificios = res.edificios;
              },err=>{
      
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
