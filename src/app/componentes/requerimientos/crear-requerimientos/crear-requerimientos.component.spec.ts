import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRequerimientosComponent } from './crear-requerimientos.component';

describe('CrearRequerimientosComponent', () => {
  let component: CrearRequerimientosComponent;
  let fixture: ComponentFixture<CrearRequerimientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearRequerimientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearRequerimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
