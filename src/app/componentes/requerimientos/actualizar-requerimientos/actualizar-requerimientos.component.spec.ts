import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarRequerimientosComponent } from './actualizar-requerimientos.component';

describe('ActualizarRequerimientosComponent', () => {
  let component: ActualizarRequerimientosComponent;
  let fixture: ComponentFixture<ActualizarRequerimientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarRequerimientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarRequerimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
