import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackupService } from 'src/app/services/backup.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { GLOBAL } from '../../../services/GLOBAL'; //
@Component({
  selector: 'app-bakup-index',
  templateUrl: './bakup-index.component.html',
  styleUrls: ['./bakup-index.component.css'],
})
export class BakupIndexComponent implements OnInit {
  public success_message: any;
  public error_message: any;

  public identity: any;
  constructor(
    private _usarioService: UsuarioService,
    private _route: Router,
    private _backupService: BackupService
  ) {
    this.identity = this._usarioService.getIdentity();
  }

  ngOnInit(): void {
    if (this.identity.Rol=== 'ADMIN') {
    } else {
      this._route.navigate(['']);
    }
  }

  async backups() {
    if (this.identity.Rol=== 'ADMIN') {
      try {
        const response = await fetch(`${GLOBAL.url}/backup`, {
          method: 'POST',
        });
        if (response.ok) {
          const fecha = new Date();
          const data = await response.blob();
          let a = document.createElement('a');
          a.href = window.URL.createObjectURL(data);
          a.download = `${fecha.getDate()}-${fecha.getMonth()+1}-${fecha.getFullYear()}-ActivosFijosBackup.sql`;
          a.click();
          this.success_message = 'Bakup creado correctamente.';
          this.sleep(2000).then(() => this.success_message = '');
          // alert('GOGO');
        } else {
          const data = await response.json();
          alert(data.message);
        }
      } catch (error) {
        console.log(error);
        alert('Error algo salio');
      }
    } else {
      this._route.navigate(['']);
    }

  }

  // onSubmit(backupsForm: any){
  //   if(backupsForm.valid){
  //     console.log(backupsForm.value);
  //     this._backupService.insert_direccion({
  //       // urlLocal:
  //     }).subscribe(
  //       res=>{
  //         this.success_message = 'Backup generado correctamente.';
  //       },err=>{

  //       }
  //     );

  //   }else{
  //     this.error_message = 'Seleccione dirección';
  //   }
  // }

  success_alert() {
    this.success_message = '';
  }

  error_alert() {
    this.error_message = '';
  }

  sleep(milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }
}
