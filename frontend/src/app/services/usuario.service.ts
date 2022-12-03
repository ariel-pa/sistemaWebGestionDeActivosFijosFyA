import { Injectable } from '@angular/core';

import { Observable } from "rxjs";//
import { HttpClient, HttpHeaders } from "@angular/common/http";//sirve para hacer conexion con el baquend y frontend
import { GLOBAL } from "./GLOBAL";//
import { Usuario } from "../models/Usuario";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public url: any;
  public usuario: any;
  public token: any;
  public identity: any;

  constructor(
    private _http: HttpClient,
  ) { 
    this.url = GLOBAL.url;
    this.usuario = new Usuario('',1,'','','','','','');
  }


  login(usuario: any, gettoken = false):Observable<any>{
    let json = usuario;//Toma valor del frontends

    if(gettoken != false){
      usuario.gettoken = true;
    }  

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'login', json,{headers:headers});//mandamos al bakend mediante un json
  }

  getToken():Observable<any>{
    let token = localStorage.getItem('token');
    if(token){
      this.token = token;
    }else{
      this.token = null;
    }

    return this.token;
  }

  getIdentity():Observable<any>{
    let identity = JSON.parse(localStorage.getItem('identity')!);
    // console.log(identity);
     if(identity){
      this.identity = identity;
     }else{
       this.identity = null;
     }

     return this.identity;
  }

  get_usuarios():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"usuarios",{headers:headers});
  }

  get_empleados(filtro: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"funcionarios/"+filtro,{headers:headers});
  }

  insert_usuario(data: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'registrar',data,{headers:headers});
  }

  get_usuario(idUsuario:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"usuario/"+idUsuario,{headers:headers});
  }

  update_usuario(data: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + 'usuario/editar/'+data.idUsuario,data,{headers:headers});
  }
}
