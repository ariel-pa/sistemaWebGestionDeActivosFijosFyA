import { Injectable } from '@angular/core';

import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DepreciacionService {

  public url:any;
  constructor(
    private _http: HttpClient,
  ) { 
    this.url = GLOBAL.url;
  }

  get_activosDepreciables(filtro: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"depreciacion/"+filtro,{headers:headers});
  }

  insert_Depreciacion(data: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'depreciacion/registrar',data,{headers:headers});
  }
  get_DataDepreciacion(idActivo: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"datadepreciacion/"+idActivo,{headers:headers});
  }

  get_altaEmpleado():Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"empleadoalta",{headers:headers});
  }

  get_Depreciaciones():Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"depreciaciones/",{headers:headers});
  }

  //VALORES PARA DEPRECIAR
  get_ValorDepreciacion():Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"valores",{headers:headers});
  }

  insert_ValorDepreciacion(data: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'valor/registrar',data,{headers:headers});
  }

  delete_ValorDepreciacion(idValorDep: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'valor/eliminar/'+idValorDep,{headers:headers});
  }
}
