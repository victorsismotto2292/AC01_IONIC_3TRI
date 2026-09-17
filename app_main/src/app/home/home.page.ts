import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, RangeCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  private readonly router = inject(Router);
  private readonly alertController = inject(AlertController);

  diaria: string | number = '';
  rangeDias = 1;

  onIonChange(evento: RangeCustomEvent): void {
    const valor = evento.detail.value;

    this.rangeDias = typeof valor === 'number' ? valor : Number(valor);
  }

  async telaReserva(): Promise<void> {

    const valorDiaria =
      String(this.diaria ?? '').trim().replace(',', '.');

    const diaria = parseFloat(valorDiaria);

    if (!valorDiaria || !Number.isFinite(diaria) || diaria <= 0) {

      const alerta = await this.alertController.create({
        header: 'ERRO!',
        message:
          'Inválido, por favor, digite um valor da diária positivo e não nulo.',
        buttons: ['OK']
      });

      await alerta.present();
      return;
    }

    const total = diaria * this.rangeDias;

    await this.router.navigate(['/tela-orcamento', diaria.toFixed(2), this.rangeDias, total.toFixed(2)]);
  }

  verLista(): void {
    this.router.navigateByUrl('/lista-orcamentos');
  }
}