import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public identity: any;
  public token: any;
  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router,
  ) {
    this.identity =  this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();
    // console.log(this.identity);
   }

  ngOnInit(): void {
  }
  logout(){//mandamos la función con click al sidebar html
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    this.identity = null;
    this.token = null;
    this._router.navigate(['']);
  }
}
