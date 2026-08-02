import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutPadrao } from './layout-padrao';

describe('LayoutPadrao', () => {
  let component: LayoutPadrao;
  let fixture: ComponentFixture<LayoutPadrao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutPadrao],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutPadrao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
