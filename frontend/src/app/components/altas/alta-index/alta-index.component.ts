import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AltaService } from 'src/app/services/alta.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-alta-index',
  templateUrl: './alta-index.component.html',
  styleUrls: ['./alta-index.component.css']
})
export class AltaIndexComponent implements OnInit {
  public identity: any
  public empleadoalta: any
  p: number = 1;
  constructor(
    private _usarioService: UsuarioService,
    private _route: Router,
    private _altaService: AltaService,
  ) { 
    this.identity = this._usarioService.getIdentity();
  }

  ngOnInit(): void {
    if(this.identity){
      //usuario logueado
      this._altaService.get_altaEmpleado().subscribe(
        res=>{
          this.empleadoalta= res.empleadosalta;
          console.log(this.empleadoalta);
        },err=>{

        }
      );
    }else{
      this._route.navigate(['']);
    }
  }

}
