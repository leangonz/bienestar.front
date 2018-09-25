import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorInsumosComponent } from './buscador-insumos.component';

describe('BuscadorInsumosComponent', () => {
  let component: BuscadorInsumosComponent;
  let fixture: ComponentFixture<BuscadorInsumosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscadorInsumosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorInsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
