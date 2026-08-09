import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaEPIs } from './tela-epis';

describe('TelaEPIs', () => {
  let component: TelaEPIs;
  let fixture: ComponentFixture<TelaEPIs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaEPIs],
    }).compileComponents();

    fixture = TestBed.createComponent(TelaEPIs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
