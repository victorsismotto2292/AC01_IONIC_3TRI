import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TelaOrcamentoPage } from './tela-orcamento.page';

const routes: Routes = [
  {
    path: '',
    component: TelaOrcamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TelaOrcamentoPageRoutingModule {}
