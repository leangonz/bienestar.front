import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorMenusComponent } from './buscador-menus.component';

describe('BuscadorMenusComponent', () => {
  let component: BuscadorMenusComponent;
  let fixture: ComponentFixture<BuscadorMenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscadorMenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
