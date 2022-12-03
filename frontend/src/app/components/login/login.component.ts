import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';//
import { UsuarioService } from 'src/app/services/usuario.service';//
import { Usuario } from "../../models/Usuario";//

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public usuario: any;
  public token: any;
  public identity: any;
  public data_error: any;

  constructor(
    private _usuarioService: UsuarioService,//Traemos el servicio
    private _router: Router,
  ) { 
    this.usuario = new Usuario('',1,'','','','','','');
    this.identity = this._usuarioService.getIdentity();
  }

  ngOnInit(): void {
    if(this.identity){
      this._router.navigate(['activos']);
    }
  }

  close_alert(){
    this.data_error = '';
  }

  login(loginForm: any){
    if(loginForm.valid){
        this._usuarioService.login(this.usuario).subscribe(//mediante this.usuario se envia los datos de login
          response=>{
            
            this.token = response.jwt;//optenemos token mediante response de la consola del navegador
            localStorage.setItem('token',this.token);//enviamos el token al localStorage

            this._usuarioService.login(this.usuario, true).subscribe(//al tener un token envia un true
            response=>{
              // console.log(response);
              localStorage.setItem('identity', JSON.stringify(response.user));
              this._router.navigate(['dashboard']);//un vez logueado redirige a  
            },
            error=>{

            }
            )
          },
          error=>{
            // console.log(<any>error.error.message)
            this.data_error = error.error.message;
            this.sleep(2000).then(() => this.data_error = ''); 
          }
          
        )
    }else{

    }
  }

  sleep(milliseconds : number) {
    return new Promise(resolve => setTimeout( resolve, milliseconds));
  }

}
