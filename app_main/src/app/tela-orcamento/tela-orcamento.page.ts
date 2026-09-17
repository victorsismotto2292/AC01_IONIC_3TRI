import { Component, inject, OnInit } from '@angular/core'; // INJECT PARA CHAMADA DE APIS E PACOTES IONIC E ONINIT PARA FUNÇÕES NG
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // ALERTCONTROLLER PARA PERSONALIZAÇÃO DE ALERTS
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
    this.diaria = this.route.snapshot.paramMap.get('diaria') || ''; // BUSCA O PARÂMETRO DO VALOR DA DIÁRIA NA HOME E ENTREGA O RESULTADO
    this.dias = this.route.snapshot.paramMap.get('dias') || ''; // BUSCA O PARÂMETRO DA QUANTIDADE DE DIAS NA HOME E ENTREGA O RESULTADO
    this.total = this.route.snapshot.paramMap.get('total') || ''; // BUSCA O PARÂMETRO DO VALOR TOTAL DA DIÁRIA C/ DIAS E ENTREGA O RESULTADO
  }

  voltar(): void {
    this.router.navigateByUrl('/home');
  }

  async confirmar(): Promise<void> {
    const alerta = await this.alertController.create({ // ALERTA PERSONALIZADO (PARÂMETROS DO ION-ALERT)
      header: 'Confirmar reserva',
      message: `Deseja salvar a reserva de R$ ${this.total} por ${this.dias} dia(s)?`,
      buttons: [
        { text: 'CANCELAR', role: 'cancel' }, // BOTÃO DE CANCELAR PERSONALIZADO, EXECUTA A FUNÇÃO DE CANCELAR A OPERAÇÃO E NÃO FAZER ALTERAÇÕES
        { text: 'CONFIRMAR', role: 'confirm' } // BOTÃO DE CONFIRMAÇÃO PERSONALIZADO, EXECUTA A FUNÇÃO DE SALVAR A RESERVA COM OS PARÂMETROS OFERECIDOS DENTRO DO LOCALSTORAGE IONIC
      ]
    });

    await alerta.present();
    const resultado = await alerta.onDidDismiss(); // RETORNA UM PROMISE<VOID> QUANDO O ALERT SOME OU QUANDO ALGUM BOTÃO É PRESSIONADO
    if (resultado.role !== 'confirm') {
      return;
    }

    await this.orcamentosService.adicionarOrcamento({
      diaria: this.diaria,
      dias: this.dias,
      total: this.total,
      datareserva: new Date().toISOString() // ISOTSTRING RETORNA UMA DATA COMO UM FORMATO STRING, EVITANDO CONFLITOS DAS CONSTANTES ANTES DEFINIDAS
    });

    await this.router.navigate(['/confirmacao', this.total]); // RETORNA PARA A TELA DE CONFIRMAÇÃO EXIBINDO O RESULTADO FINAL
  }
}
