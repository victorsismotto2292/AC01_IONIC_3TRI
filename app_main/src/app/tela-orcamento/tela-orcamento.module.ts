import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular/lazy';

import { TelaOrcamentoPageRoutingModule } from './tela-orcamento-routing.module';

import { TelaOrcamentoPage } from './tela-orcamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TelaOrcamentoPageRoutingModule
  ],
  declarations: [TelaOrcamentoPage]
})
export class TelaOrcamentoPageModule {}
