import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { IonicModule } from '@ionic/angular/lazy';
import { Storage } from '@ionic/storage-angular';
import { ListaOrcamentosPage } from './lista-orcamentos.page';

describe('ListaOrcamentosPage', () => {
  let component: ListaOrcamentosPage;
  let fixture: ComponentFixture<ListaOrcamentosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaOrcamentosPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: Storage, useValue: { create: async () => undefined, get: async () => [], set: async () => undefined } },
        { provide: Location, useValue: { back: () => undefined } }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ListaOrcamentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
