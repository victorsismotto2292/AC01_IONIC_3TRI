import { Injectable, inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Orcamento {
  diaria: string;
  dias: string;
  total: string;
  datareserva: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrcamentosService {
  private readonly storage = inject(Storage);
  private readonly chave = 'orcamentos';
  private readonly storagePronto = this.inicializarStorage();

  private async inicializarStorage(): Promise<void> {
    await this.storage.create();
  }

  async obterOrcamentos(): Promise<Orcamento[]> {
    await this.storagePronto;
    const orcamentos = await this.storage.get(this.chave);
    return Array.isArray(orcamentos) ? orcamentos : [];
  }

  async adicionarOrcamento(orcamento: Orcamento): Promise<void> {
    await this.storagePronto;
    const orcamentos = await this.obterOrcamentos();
    await this.storage.set(this.chave, [...orcamentos, orcamento]);
  }

  async excluirOrcamento(indice: number): Promise<void> {
    await this.storagePronto;
    const orcamentos = await this.obterOrcamentos();
    if (indice < 0 || indice >= orcamentos.length) {
      return;
    }

    await this.storage.set(
      this.chave,
      orcamentos.filter((_, indiceAtual) => indiceAtual !== indice)
    );
  }
}
