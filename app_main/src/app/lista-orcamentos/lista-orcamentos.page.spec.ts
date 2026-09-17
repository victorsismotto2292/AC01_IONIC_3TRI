import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaOrcamentosPage } from './lista-orcamentos.page';

describe('ListaOrcamentosPage', () => {
  let component: ListaOrcamentosPage;
  let fixture: ComponentFixture<ListaOrcamentosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaOrcamentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
