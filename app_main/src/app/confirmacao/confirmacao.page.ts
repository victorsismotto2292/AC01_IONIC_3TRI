import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.page.html',
  styleUrls: ['./confirmacao.page.scss'],
  standalone: false,
})
export class ConfirmacaoPage {

  total: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {

    this.total =
      this.route.snapshot.paramMap.get('total') || '';

  }

  verLista() {
    this.router.navigateByUrl('lista-orcamentos');
  }

  novaReserva() {
    this.router.navigateByUrl('home');
  }

}