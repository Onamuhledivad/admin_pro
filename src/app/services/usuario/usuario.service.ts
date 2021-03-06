import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

import { map } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _SubirarchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  loginGoogle( token: string ) {

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, { token } ).pipe(map((resp: any) => {
                this.guardarStorage(resp.id, resp.token, resp.usuario);
                return true;
              }));

  }

  login(usuario: Usuario, recordar: boolean = false ) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).pipe(map((res: any) => {
                  //localStorage.setItem('id', res.id );
                  //localStorage.setItem('token', res.token );
                  //localStorage.setItem('usuario', JSON.stringify(res.usuario));
                  this.guardarStorage(res.id, res.token, res.usuario);
                  return true;
                }));

  }

  logout() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  crearUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario).pipe(map((res: any) => {
                  Swal.fire ({
                    icon: 'success',
                    title: 'Usuario Creado',
                    text: usuario.email
                    });

                  return res.usuario;
                }));
  }


  actualizarUsuario( usuario: Usuario) {
      let url = URL_SERVICIOS + '/usuario/' + usuario._id;
      url += '?token=' + this.token;

      return this.http.put( url, usuario ).pipe(map((res: any) => {

        let usuarioDB: Usuario = res.usuario;

        this.guardarStorage( usuarioDB._id, this.token, usuarioDB );
        Swal.fire ({
          icon: 'success',
          title: 'Usuario Actualizado',
          text: usuario.nombre
          });
        return true;
      }));
  }


  cambiarImagen( archivo: File, id: string ) {
    this._SubirarchivoService.subirArchivo( archivo, 'usuarios', id )
        .then( (resp: any) => {
          this.usuario.img = resp.usuario.img;
          Swal.fire ({
            icon: 'success',
            title: 'Imagen Actualizada',
            text: ''
            });
          this.guardarStorage(id, this.token, this.usuario);
        })
        .catch( resp => {
          console.log(resp);
        });
  }

  cargarUsuarios( desde: number = 0) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuarios( termino:string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuario/' + termino;
    return this.http.get(url)
               .pipe(map((res: any) => res.usuarios ));  
  }





}
