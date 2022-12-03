import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Proveedor } from "../../../models/Proveedor";

@Component({
  selector: 'app-proveedor-create',
  templateUrl: './proveedor-create.component.html',
  styleUrls: ['./proveedor-create.component.css']
})
export class ProveedorCreateComponent implements OnInit {
  public identity: any;
  public proveedor: any;

  public success_message: any;
  public error_message: any;
  constructor(
    private _usarioService: UsuarioService,
    private _route: Router,
    private _proveedorService: ProveedorService,
  ) { 
    this.identity = this._usarioService.getIdentity();
    this.proveedor = new Proveedor(0,'','','');
  }

  ngOnInit(): void {
    if(this.identity){

    }else{
      this._route.navigate(['']);
    }
  }

  onSubmit(proveedorForm: any){
    if(proveedorForm.valid){
      this._proveedorService.insert_proveedor({
        NombreProv: proveedorForm.value.NombreProv,
        DireccionProv: proveedorForm.value.DireccionProv,
        TelefonoProv: proveedorForm.value.TelefonoProv,
      }).subscribe(
        res=>{
          this.success_message = 'Proveedor registrado correctamente.';
          this.proveedor = new Proveedor(0,'','','');
          this.sleep(2000).then(() => this.success_message = '');
        },err=>{

        }
      );
    }else{
      this.error_message = 'Complete el formulario';
      this.sleep(2000).then(() => this.error_message = '');
    }
  }

  success_alert(){
    this.success_message = ''; 
  }

  error_alert(){
    this.error_message = ''; 
  }

  sleep(milliseconds : number) {
    return new Promise(resolve => setTimeout( resolve, milliseconds));
  }
}
