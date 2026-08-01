import { TestBed } from '@angular/core/testing';

import { TelaConfiguracoes } from './tela-configuracoes';

describe('TelaConfiguracoes', () => {
  let service: TelaConfiguracoes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TelaConfiguracoes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
