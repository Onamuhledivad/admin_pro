import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: any;

  constructor(
    public _usuarioService: UsuarioService
  ) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar( userform: Usuario ) {
    this.usuario.nombre = userform.nombre;
    if ( !this.usuario.google) {
      this.usuario.email = userform.email;
    }

    this._usuarioService.actualizarUsuario( this.usuario )
                        .subscribe( resp => {
                          console.log(resp);
                        });
  }

      seleccionImagen( archivo: File ) {
            if ( !archivo ) {
              this.imagenSubir = null;
              return;
            }

            if ( archivo.type.indexOf('image') < 0 ) {
              Swal.fire ({
                icon: 'error',
                title: 'Archivo no valido',
                text: 'Selecciona solo archivos de tipo imagen'
                });
              this.imagenSubir = null;
              return;
            }

            this.imagenSubir = archivo;
            const reader = new FileReader();
            let urlImagenTemp = reader.readAsDataURL(archivo);

            reader.onloadend = () => {
              this.imagenTemp = reader.result;
            };
      }

  cambiarImagen() {
    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );
  }


}
