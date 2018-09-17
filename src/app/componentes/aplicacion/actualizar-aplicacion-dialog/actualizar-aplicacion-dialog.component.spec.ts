import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarAplicacionDialogComponent } from './actualizar-aplicacion-dialog.component';

describe('ActualizarAplicacionDialogComponent', () => {
  let component: ActualizarAplicacionDialogComponent;
  let fixture: ComponentFixture<ActualizarAplicacionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarAplicacionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarAplicacionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
