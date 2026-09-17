import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RangeCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  private readonly router = inject(Router);
  diaria = '';
  rangeDias = 1;
  res = '';

  onIonChange(evento: RangeCustomEvent): void {
    const valor = evento.detail.value;
    this.rangeDias = typeof valor === 'number' ? valor : Number(valor);
  }

  telaReserva(): void {
    const diaria = Number(this.diaria);

    if (!this.diaria.trim() || !Number.isFinite(diaria) || diaria <= 0) {
      this.res = 'Inválido, por favor, digite um valor da diária positivo e não nulo.';
      return;
    }

    const total = diaria * this.rangeDias;
    this.res = '';
    this.router.navigate(['/tela-orcamento', diaria.toFixed(2), this.rangeDias, total.toFixed(2)]);
  }

  verLista(): void {
    this.router.navigateByUrl('/lista-orcamentos');
  }
}
