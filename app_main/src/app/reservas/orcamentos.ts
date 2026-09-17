import { Injectable, inject } from '@angular/core'; // INJECT PARA CHAMADA DE APIS E PACOTES IONIC
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
    return Array.isArray(orcamentos) ? orcamentos : []; // RETORNA O ARRAY DE ELEMENTOS OU UM ARRAY NULO [] CASO NENHUM ORÇAMENTO FOI CRIADO
  }

    async adicionarOrcamento(orcamento: Orcamento): Promise<void> {
      await this.storagePronto;

      const orcamentos = await this.obterOrcamentos();

      console.log('ANTES DE SALVAR:', orcamentos);

      await this.storage.set(
        this.chave,
        [...orcamentos, orcamento]
      );

      console.log(
        'DEPOIS DE SALVAR:',
        await this.storage.get(this.chave)
      );
    }

  async excluirOrcamento(indice: number): Promise<void> {
    await this.storagePronto;
    const orcamentos = await this.obterOrcamentos();
    if (indice < 0 || indice >= orcamentos.length) {
      return;
    }

    await this.storage.set(
      this.chave,
      orcamentos.filter((_, indiceAtual) => indiceAtual !== indice) // FILTER RETORNA OS ELEMENTOS DO ARRAY DE ORÇAMENTOS QUE OBEDEÇEM A CONDIÇÃO DO LOCALSTORAGE
    );
  }
}
