import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subcrip: Subscription;

  constructor() {
    this.subcrip = this.regresaObservable()
    .subscribe(
      numero => console.log('Sub ', numero),
      error => console.log('Error en subs ', error),
      () => console.error('El observador Terminó')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('cerrar pagina');
    this.subcrip.unsubscribe();
  }


  regresaObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {
      let contador = 0;
      const intervalo = setInterval( () => {

        contador ++;

        const salida = {
        valor: contador
      };

        observer.next(salida);

        /*
        if ( contador === 3 ) {
          clearInterval( intervalo );
          observer.complete();
        }
        */
        //if ( contador === 2 ) {
          //clearInterval( intervalo );
          //observer.error('Error rxjs');
        //}
      }, 1000);
    }).pipe(
      map( resp => resp.valor ),
      filter( ( valor, index ) => {
        if ( (valor % 2) === 1 ) {
          //impar
            return true;
        } else {
          //es par
          return false;
        }
      })
    );
  }

}
