import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjusteStockComponent } from './ajuste-stock.component';

describe('AjusteStockComponent', () => {
  let component: AjusteStockComponent;
  let fixture: ComponentFixture<AjusteStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjusteStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjusteStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
