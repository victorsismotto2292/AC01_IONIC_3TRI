import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { IonicModule } from '@ionic/angular/lazy';
import { ConfirmacaoPage } from './confirmacao.page';

describe('ConfirmacaoPage', () => {
  let component: ConfirmacaoPage;
  let fixture: ComponentFixture<ConfirmacaoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmacaoPage],
      imports: [IonicModule.forRoot()],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '100.00' } } } }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ConfirmacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
