import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RangeCustomEvent } from '@ionic/angular';

interface Orcamento {
  diaria: string;
  dias: string;
  total: string;
  datareserva: Date;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  // PARTE ANTIGA:
  diaria: string = '';
  rangeDias: number = 1;
  res: string = '';
  alertButtons = ['OK'];

  // PARTE NOVA:
  orcamento: Orcamento = {
    diaria: '',
    dias: '1',
    total: '',
    datareserva: new Date()
  };

  constructor(private router: Router) {}

  // Alteração do ion-range:
  onIonChange(ev: RangeCustomEvent) {
    this.rangeDias = parseInt(ev.detail.value.toString());

    // Atualiza também o objeto do orçamento
    this.orcamento.dias = this.rangeDias.toString();
  }

  // Verificar os dados e ir para a Tela 2:
  telaReserva() {

    const vdiaria = parseFloat(this.diaria);

    // Validação da diária
    if (isNaN(vdiaria) || this.diaria === '' || vdiaria <= 0) {

      this.res =
        'Inválido, por favor, digite um valor da diária positivo e não nulo.';

      return;
    }

    // Calcula o total
    const total = vdiaria * this.rangeDias;

    // Guarda os dados no objeto
    this.orcamento.diaria = this.diaria;
    this.orcamento.dias = this.rangeDias.toString();
    this.orcamento.total = total.toFixed(2);

    this.res = '';

    // Vai para a tela de detalhes
    this.router.navigateByUrl(
      `tela-orcamento/${this.orcamento.diaria}/${this.orcamento.dias}/${this.orcamento.total}`
    );
  }

}