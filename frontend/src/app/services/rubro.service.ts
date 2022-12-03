import { Injectable } from '@angular/core';

import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RubroService {
  public url:any;
  constructor(
    private _http: HttpClient,
  ) { 
    this.url = GLOBAL.url;
  }


  get_rubroById(idRubro: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"rubro/"+idRubro,{headers:headers});
  }
  insert_rubro(data: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'rubro/registrar',data,{headers:headers});
  }

  update_rubro(data: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url+"rubro/editar/"+data.idRubro,data,{headers:headers});
  }

  delete_rubro(idRubro: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'rubro/eliminar/'+idRubro,{headers:headers});
  }
}
