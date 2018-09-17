import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarAplicacionComponent } from './actualizar-aplicacion.component';

describe('ActualizarAplicacionComponent', () => {
  let component: ActualizarAplicacionComponent;
  let fixture: ComponentFixture<ActualizarAplicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarAplicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarAplicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
