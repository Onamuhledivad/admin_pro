import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  constructor( public _ajustes: SettingsService ) { }

  ngOnInit() {
    this.guardarCheck();
  }

  cambiarColor( tema: string, link: any ) {
    this.aplicarCheck( link );
    this._ajustes.aplicarTema( tema );

  }

  aplicarCheck( link: HTMLTextAreaElement ) {
    const selectores = document.getElementsByClassName('selector');
    for (let i = 0; i < selectores.length; i++ ) {
      selectores[i].classList.remove('working');
    }
    link.classList.add('working');
  }

  guardarCheck() {
    const selectores: any = document.getElementsByClassName('selector');
    const tema = this._ajustes.ajustes.tema;
    for (let ref of selectores ) {
       if ( ref.getAttribute('data-theme') === tema ) {
           ref.classList.add('working');
           break;
       }
    }
  }

}
