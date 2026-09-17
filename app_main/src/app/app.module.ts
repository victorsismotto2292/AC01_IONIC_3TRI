import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import {
  IonicRouteStrategy,
  IonApp,
  IonRouterOutlet,
  provideIonicAngular
} from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// PACOTE DE ARMAZENAMENTO IONIC:
import { IonicStorageModule } from '@ionic/storage-angular';

// NGMODULE REFORMULADO PARA EVITAR ERROS DE VERSÕES DO ANGULAR NÃO COINCIDIREM COM IONIC MODULE

@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,

    IonApp,
    IonRouterOutlet,

    IonicStorageModule.forRoot()
  ],

  providers: [
    provideIonicAngular(),

    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    }
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}