import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.page.html',
  styleUrls: ['./confirmacao.page.scss'],
  standalone: false,
})
export class ConfirmacaoPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  total = '';

  ngOnInit(): void {
    this.total = this.route.snapshot.paramMap.get('total') || '';
  }

  verLista(): void {
    this.router.navigateByUrl('/lista-orcamentos');
  }

  novaReserva(): void {
    this.router.navigateByUrl('/home');
  }
}
