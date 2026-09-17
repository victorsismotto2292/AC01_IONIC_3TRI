import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { IonicModule } from '@ionic/angular/lazy';
import { Storage } from '@ionic/storage-angular';
import { TelaOrcamentoPage } from './tela-orcamento.page';

describe('TelaOrcamentoPage', () => {
  let component: TelaOrcamentoPage;
  let fixture: ComponentFixture<TelaOrcamentoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TelaOrcamentoPage],
      imports: [IonicModule.forRoot()],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '100.00' } } } },
        { provide: Storage, useValue: { create: async () => undefined, get: async () => [], set: async () => undefined } }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(TelaOrcamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
