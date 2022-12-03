import { Injectable } from '@angular/core';

import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CantidadesService {
  public url:any;
  constructor(
    private _http: HttpClient,
  ) { 
    this.url = GLOBAL.url;
  }

  get_bajas():Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"cant_baja",{headers:headers});
  }

  get_disponibles():Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"cant_disponible",{headers:headers});
  }

  get_mantenimiento():Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"cant_mantenimiento",{headers:headers});
  }

  get_asignados():Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"cant_asignado",{headers:headers});
  }

  get_depreciados():Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"cant_depreiados",{headers:headers});
  }

  get_revalorizar():Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"cant_revalorizar",{headers:headers});
  }

  get_edificios():Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"cant_edificios",{headers:headers});
  }

  get_ReqMantenimiento():Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"cant_reqmantenimiento",{headers:headers});
  }

  get_ProyectosEjecucion():Observable<any>{//verificar en el backen si necesita parametro
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"proyectosejecucion",{headers:headers});
  }

}
