import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { OrcamentosService } from '../reservas/orcamentos';

@Component({
  selector: 'app-tela-orcamento',
  templateUrl: './tela-orcamento.page.html',
  styleUrls: ['./tela-orcamento.page.scss'],
  standalone: false,
})
export class TelaOrcamentoPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly alertController = inject(AlertController);
  private readonly orcamentosService = inject(OrcamentosService);
  diaria = '';
  dias = '';
  total = '';

  ngOnInit(): void {
    this.diaria = this.route.snapshot.paramMap.get('diaria') || '';
    this.dias = this.route.snapshot.paramMap.get('dias') || '';
    this.total = this.route.snapshot.paramMap.get('total') || '';
  }

  voltar(): void {
    this.router.navigateByUrl('/home');
  }

  async confirmar(): Promise<void> {
    const alerta = await this.alertController.create({
      header: 'Confirmar reserva',
      message: `Deseja salvar a reserva de R$ ${this.total} por ${this.dias} dia(s)?`,
      buttons: [
        { text: 'CANCELAR', role: 'cancel' },
        { text: 'CONFIRMAR', role: 'confirm' }
      ]
    });

    await alerta.present();
    const resultado = await alerta.onDidDismiss();
    if (resultado.role !== 'confirm') {
      return;
    }

    await this.orcamentosService.adicionarOrcamento({
      diaria: this.diaria,
      dias: this.dias,
      total: this.total,
      datareserva: new Date().toISOString()
    });

    await this.router.navigate(['/confirmacao', this.total]);
  }
}
