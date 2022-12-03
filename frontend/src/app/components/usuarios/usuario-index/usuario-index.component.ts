import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { GLOBAL } from "../../../services/GLOBAL";

@Component({
  selector: 'app-usuario-index',
  templateUrl: './usuario-index.component.html',
  styleUrls: ['./usuario-index.component.css']
})
export class UsuarioIndexComponent implements OnInit {

  public usuarios: any;
  public url: any
  public identity: any;

  p: number = 1;

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router,
  ) {
    this.url = GLOBAL.url;
    this.identity = this._usuarioService.getIdentity();
   }

  ngOnInit(): void {
    if(this.identity.Rol === 'ADMIN'){
      this._usuarioService.get_usuarios().subscribe(
        res=>{
          this.usuarios = res.user;
          // console.log(this.usuarios);
        },err=>{
  
        }
      );
    }else{
      this._router.navigate(['dashboard']);
    }

    }

}
