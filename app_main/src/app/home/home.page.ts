import { Component } from '@angular/core';
import { OrcamentosService } from '../reservas/orcamentos';

interface Orcamento{
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

  orcamentos: Orcamento[] = [];
  orcamento: Orcamento = {diaria: '', dias: '1', total: '', datareserva: new Date()};

  indiceEdicao: number = -1;

  constructor(private orcamentosService: OrcamentosService) {}

  ngOnInit(){
    this.carregarOrcamentos();
  }

  // Carregar orçamentos:
  async carregarOrcamentos(){
    this.orcamentos = await this.orcamentosService.obterOrcamentos();
  }

  // Salvar orçamento:
  async salvarOrcamento(){
    if (this.indiceEdicao >= 0){
      await this.orcamentosService.atualizarOrcamento(this.indiceEdicao, this.orcamento);
    }
    else{
      await this.orcamentosService.adicionarOrcamento(this.orcamento);
    }
    this.limparFormulario();
    this.carregarOrcamentos();
  }

  // Atualizar ou editar ou orçamento:
  editarContato(indice: number){
    this.orcamento = {...this.orcamentos[indice]};
    this.indiceEdicao = indice;
  }

  // Excluir um orçamento:
  async excluirOrcamento(indice: number){
    await this.orcamentosService.excluirOrcamento(indice);
    this.carregarOrcamentos();
  }

  limparFormulario(){
    this.orcamento = { diaria: '', dias: '-1', total: '', datareserva: new Date() };
    this.indiceEdicao = -1;
  }

}
