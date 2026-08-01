import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaConfiguracoes } from './configuracoes';

describe('TelaConfiguracoes', () => {
  let component: TelaConfiguracoes;
  let fixture: ComponentFixture<TelaConfiguracoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaConfiguracoes],
    }).compileComponents();

    fixture = TestBed.createComponent(TelaConfiguracoes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
