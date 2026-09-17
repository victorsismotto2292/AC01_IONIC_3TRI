import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core'; // INJECT UTILIZADO PARA CHAMAR A API E OS PACOTES
import { AlertController } from '@ionic/angular'; // ALERTCONTROLLER PARA USO DE ALERTS PERSONALIZADOS
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
    this.orcamentos =  await this.orcamentosService.obterOrcamentos();
    this.changeDetector.markForCheck(); // FUNÇÃO QUE VERIFICA QUAIS ELEMENTOS FORAM ALTERADOS NO ARRAY
  }

  async excluirOrcamento(indice: number): Promise<void> {
    const orcamento = this.orcamentos[indice];
    if (!orcamento) {
      return;
    }
    const alerta = await this.alertController.create({
      header: 'Excluir orçamento',
      message: `Tem certeza que deseja excluir o orçamento de R$ ${orcamento.total}?`,
      buttons: [ // ESTILIZAÇÕES DO ALERTBUTTONS IONIC
        {
          text: 'CANCELAR',
          role: 'cancel' // FUNÇÃO DE BACK (VOLTAR), CANCELA A OPERAÇÃO
        },
        {
          text: 'EXCLUIR',
          role: 'destructive' // ELIMINA A RESERVA DO ARRAY
        }
      ]
    });

    await alerta.present();

    const resultado = await alerta.onDidDismiss(); // RETORNA UM PROMISE<VOID> DEPOIS QUE O ALERTA SOME OU QUANDO O USUÁRIO APERTA UM DOS BOTÕES

    if (resultado.role !== 'destructive') {
      return;
    }

    await this.orcamentosService.excluirOrcamento(indice);

    await this.carregarOrcamentos();
  }

  voltar(): void {
    this.location.back(); // FUNÇÃO QUE VOLTA PARA A TELA 2
  }

}