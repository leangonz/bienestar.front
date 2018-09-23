import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoMenuRealizadoComponent } from './ingreso-menu-realizado.component';

describe('IngresoMenuRealizadoComponent', () => {
  let component: IngresoMenuRealizadoComponent;
  let fixture: ComponentFixture<IngresoMenuRealizadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresoMenuRealizadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoMenuRealizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
