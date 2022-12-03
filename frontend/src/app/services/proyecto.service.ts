import { Injectable } from '@angular/core';

import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  public url:any;
  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url;
   }

   get_proyectos(filtro: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"proyectos/"+filtro,{headers:headers});
  }

  insert_Proyecto(data: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'proyecto/registrar',data,{headers:headers});
  }

  get_ProyectoById(idProyecto: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"proyecto/"+idProyecto,{headers:headers});
  }

  update_Proyecto(data: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url+"proyecto/editar/"+data.idProyecto,data,{headers:headers});
  }

  delete_edificio(idProyecto: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'proyecto/eliminar/'+idProyecto,{headers:headers});
  }
  get_Programas(filtro: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"programas/"+filtro,{headers:headers});

  }
  insert_Programa(data: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'programa/registrar',data,{headers:headers});
  }
}
