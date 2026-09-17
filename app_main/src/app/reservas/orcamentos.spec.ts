import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';
import { OrcamentosService } from './orcamentos';

describe('OrcamentosService', () => {
  let service: OrcamentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrcamentosService,
        {
          provide: Storage,
          useValue: {
            create: async () => undefined,
            get: async () => [],
            set: async () => undefined
          }
        }
      ]
    });
    service = TestBed.inject(OrcamentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
