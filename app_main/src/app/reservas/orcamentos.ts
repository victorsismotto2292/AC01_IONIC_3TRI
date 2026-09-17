import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";

interface Orcamento{
    diaria: string;
    dias: string;
    total: string;
    datareserva: Date;
}

@Injectable({
    providedIn: "root"
})

export class OrcamentosService{
    private storageInicializado = false;

    constructor (private storage: Storage){
        this.inicializarStorage();
    }

    private async inicializarStorage(){
        await this.storage.create();
        this.storageInicializado = true;
    }

    // Obter todos os orçamentos:
    async obterOrcamentos(): Promise<Orcamento[]>{
        if (!this.storageInicializado) await this.inicializarStorage();
        return (await this.storage.get('orcamentos')) || [];
    }

    // Adicionar um orçamento:
    async adicionarOrcamento(orcamento: Orcamento): Promise<void>{
        const orcamentos = await this.obterOrcamentos();
        orcamentos.push(orcamento);
        await this.storage.set('orcamentos', orcamentos);
    }

    // Atualizar um orçamento:
    async atualizarOrcamento(indice: number, orcamento: Orcamento): Promise<void>{
        const orcamentos = await this.obterOrcamentos();
        orcamentos[indice] = orcamento;
        await this.storage.set('orcamentos', orcamentos);
    }

    // Excluir um orçamento:
    async excluirOrcamento(indice: number): Promise<void>{
        const orcamentos = await this.obterOrcamentos();
        orcamentos.splice(indice, 1);
        await this.storage.set('orcamentos', orcamentos);
    }
}