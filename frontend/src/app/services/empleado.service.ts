import { Injectable } from '@angular/core';

import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  public url:any;

  constructor(
    private _http: HttpClient,
  ) { 
    this.url = GLOBAL.url;
  }


  get_empleados(filtro: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"funcionarios/"+filtro,{headers:headers});
  }

  get_ambiente():Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"ambientes/",{headers:headers});

  }

  insert_empleado(data: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'funcionario/registrar',data,{headers:headers});
  }

  get_empleado(idEmpleado: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"funcionario/"+idEmpleado,{headers:headers});
  }

  update_empleado(data: any):Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url+"funcionario/editar/"+data.idEmpleado,data,{headers:headers});
  }

  delete_empleado(idEmpleado: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'funcionario/eliminar/'+idEmpleado,{headers:headers});
  }
}
