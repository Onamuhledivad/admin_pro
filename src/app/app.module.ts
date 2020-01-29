import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';


//Modulos
import { PagesModule } from './pages/pages.module';

//Rutas
import { APP_ROUTES } from './app.routes';
//Componentes
import { AppComponent } from './app.component';
import { RegistrerComponent } from './login/register.component';
import { LoginComponent } from './login/login.component';

//Servicios
import { ServiceModule } from './services/service.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
