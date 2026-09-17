import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then(
        m => m.HomePageModule
      )
  },

  {
    path: 'tela-orcamento/:diaria/:dias/:total',
    loadChildren: () =>
      import('./tela-orcamento/tela-orcamento.module').then(
        m => m.TelaOrcamentoPageModule
      )
  },

  {
    path: 'confirmacao/:total',
    loadChildren: () =>
      import('./confirmacao/confirmacao.module').then(
        m => m.ConfirmacaoPageModule
      )
  },

  {
    path: 'lista-orcamentos',
    loadChildren: () =>
      import('./lista-orcamentos/lista-orcamentos.module').then(
        m => m.ListaOrcamentosPageModule
      )
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { preloadingStrategy: PreloadAllModules }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}