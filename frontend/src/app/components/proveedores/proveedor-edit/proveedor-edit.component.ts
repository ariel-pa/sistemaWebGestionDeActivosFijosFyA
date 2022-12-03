import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-proveedor-edit',
  templateUrl: './proveedor-edit.component.html',
  styleUrls: ['./proveedor-edit.component.css']
})
export class ProveedorEditComponent implements OnInit {
  public identity: any;
  public proveedor: any;
  public idProveedor: any;

  public success_message: any;
  public error_message: any;
  constructor(
    private _usarioService: UsuarioService,
    private _routes: Router,
    private _route: ActivatedRoute,
    private _proveedorService: ProveedorService,
  ) { 
    this.identity = this._usarioService.getIdentity();
    // this.proveedor = new Proveedor(0,'','','');
  }

  ngOnInit(): void {
    if(this.identity){
      this._route.params.subscribe(
        paramas=>{
          this.idProveedor = paramas['id'];
          this._proveedorService.get_proveedorById(this.idProveedor).subscribe(
            res=>{
              this.proveedor = res.proveedor[0];
            },err=>{

            }
          );    
        },err=>{

        }
      );
      
    }else{
      this._routes.navigate(['']);
    }
  }

  onSubmit(proveedorForm: any){
    if(proveedorForm.valid){
      this._proveedorService.update_proveedor({
        idProveedor: this.idProveedor,
        NombreProv: proveedorForm.value.NombreProv,
        DireccionProv: proveedorForm.value.DireccionProv,
        TelefonoProv: proveedorForm.value.TelefonoProv,
      }).subscribe(
        res=>{
          this.success_message = 'Proveedor actualizado correctamente.';
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
