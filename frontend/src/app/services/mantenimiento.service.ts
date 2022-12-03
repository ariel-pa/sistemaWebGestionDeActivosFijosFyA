import { Injectable } from '@angular/core';

import { Observable } from "rxjs";//
import { HttpClient, HttpHeaders } from "@angular/common/http";//
import { GLOBAL } from "./GLOBAL";//

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {
  public url: any;
  constructor(
    private _http: HttpClient,
  ) { 
    this.url = GLOBAL.url;
  }

  get_mantenimiento(filtro: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"mantenimientos/"+filtro,{headers:headers});
  }

  insert_mantenimiento(data: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'mantenimiento/registrar',data,{headers:headers});
  }

  delete_mantenimiento(idMant: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'mantenimiento/eliminar/'+idMant,{headers:headers});
  }

}
