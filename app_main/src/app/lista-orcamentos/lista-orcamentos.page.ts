import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Orcamento, OrcamentosService } from '../reservas/orcamentos';

@Component({
  selector: 'app-lista-orcamentos',
  templateUrl: './lista-orcamentos.page.html',
  styleUrls: ['./lista-orcamentos.page.scss'],
  standalone: false,
})
export class ListaOrcamentosPage {

  private readonly orcamentosService = inject(OrcamentosService);
  private readonly alertController = inject(AlertController);
  private readonly location = inject(Location);
  private readonly changeDetector = inject(ChangeDetectorRef);

  orcamentos: Orcamento[] = [];

  async ionViewDidEnter(): Promise<void> {
    await this.carregarOrcamentos();
  }

  async carregarOrcamentos(): Promise<void> {

    this.orcamentos =
      await this.orcamentosService.obterOrcamentos();

    console.log(
      'ORÇAMENTOS CARREGADOS NA LISTA:',
      this.orcamentos
    );

    this.changeDetector.markForCheck();
  }

  async excluirOrcamento(indice: number): Promise<void> {

    const orcamento = this.orcamentos[indice];

    if (!orcamento) {
      return;
    }

    const alerta = await this.alertController.create({
      header: 'Excluir orçamento',
      message: `Tem certeza que deseja excluir o orçamento de R$ ${orcamento.total}?`,
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel'
        },
        {
          text: 'EXCLUIR',
          role: 'destructive'
        }
      ]
    });

    await alerta.present();

    const resultado = await alerta.onDidDismiss();

    if (resultado.role !== 'destructive') {
      return;
    }

    await this.orcamentosService.excluirOrcamento(indice);

    await this.carregarOrcamentos();
  }

  voltar(): void {
    this.location.back();
  }

}