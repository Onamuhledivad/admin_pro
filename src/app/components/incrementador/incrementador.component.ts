import { Component, OnInit, Input,  Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { InvokeFunctionExpr } from '@angular/compiler';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress', null) txtProgress: ElementRef;
  @Input() progress: number = 50;
  @Input('nombre') leyenda: string = 'Leyenda';

  @Output() nuevoValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    //console.log('Leyenda: ', this.leyenda);
    //console.log('Progress: ', this.progress);
  }

  ngOnInit() {
    //console.log('Leyenda ngOnInit: ', this.leyenda);
  }

  onChanges( newValue: number) {

    //const elemtHTML: any = document.getElementsByName('Progreso')[0];
    //console.log( elemtHTML.value );

    if ( newValue >= 100) {
        this.progress = 100;
    } else if ( newValue <= 0 ) {
      this.progress = 0;
    } else {
      this.progress = newValue;
    }

   //elemtHTML.value = this.progress;
    this.txtProgress.nativeElement.value = this.progress;
    this.nuevoValor.emit( this.progress );
  }

  cambiarValor( valor: number ) {

    if (this.progress > 100 && valor > 0) {
      this.progress = 100;
      return;
    }
    if (this.progress <= 0 && valor < 0) {
      this.progress = 0;
      return;
    }
    this.progress = this.progress + valor;

    this.nuevoValor.emit( this.progress );
    this.txtProgress.nativeElement.focus();
  }

}
