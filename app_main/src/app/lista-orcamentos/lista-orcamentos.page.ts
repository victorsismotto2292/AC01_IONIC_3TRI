import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrcamentosService } from '../reservas/orcamentos';

interface Orcamento {
  diaria: string;
  dias: string;
  total: string;
  datareserva: Date;
}

@Component({
  selector: 'app-lista-orcamentos',
  templateUrl: './lista-orcamentos.page.html',
  styleUrls: ['./lista-orcamentos.page.scss'],
  standalone: false,
})
export class ListaOrcamentosPage {

  orcamentos: Orcamento[] = [];

  constructor(
    private orcamentosService: OrcamentosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarOrcamentos();
  }

  async carregarOrcamentos() {
    this.orcamentos =
      await this.orcamentosService.obterOrcamentos();
  }

  async excluirOrcamento(indice: number) {

    await this.orcamentosService.excluirOrcamento(indice);

    this.carregarOrcamentos();

  }

  voltar() {
    this.router.navigateByUrl('confirmacao/0');
  }

}