import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TelaOrcamentoPage } from './tela-orcamento.page';

describe('TelaOrcamentoPage', () => {
  let component: TelaOrcamentoPage;
  let fixture: ComponentFixture<TelaOrcamentoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaOrcamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
