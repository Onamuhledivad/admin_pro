import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: string = 'usuario' ): any {
    
    let url = URL_SERVICIOS + '/imagenes';

    if (!img) {
      return url + '/no-img.jpg';
    }

    if (img.indexOf('https') >= 0 ) {
      return img;
    }

    switch ( tipo ) {
      case 'usuario':
        url += '/usuarios/' + img;
        break;
      case 'medico':
        url += '/medico/' + img;
        break;
      case 'hospital':
        url += '/hospital/' + img;
        break;

      default:
        console.log('tipo de img no existe');
        url += '/no-img.jpg';
    }

    return url;
  }

}
