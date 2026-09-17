import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrcamentosService } from '../reservas/orcamentos';

@Component({
  selector: 'app-tela-orcamento',
  templateUrl: './tela-orcamento.page.html',
  styleUrls: ['./tela-orcamento.page.scss'],
  standalone: false,
})
export class TelaOrcamentoPage {

  diaria: string = '';
  dias: string = '';
  total: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orcamentosService: OrcamentosService
  ) {}

  ngOnInit() {

    this.diaria =
      this.route.snapshot.paramMap.get('diaria') || '';

    this.dias =
      this.route.snapshot.paramMap.get('dias') || '';

    this.total =
      this.route.snapshot.paramMap.get('total') || '';
  }

  voltar() {
    this.router.navigateByUrl('home');
  }

  async confirmar() {

    const orcamento = {
      diaria: this.diaria,
      dias: this.dias,
      total: this.total,
      datareserva: new Date()
    };

    await this.orcamentosService.adicionarOrcamento(orcamento);

    this.router.navigateByUrl(`confirmacao/${this.total}`);
  }
}