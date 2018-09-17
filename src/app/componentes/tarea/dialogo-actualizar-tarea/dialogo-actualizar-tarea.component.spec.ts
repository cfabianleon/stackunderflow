import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoActualizarTareaComponent } from './dialogo-actualizar-tarea.component';

describe('DialogoActualizarTareaComponent', () => {
  let component: DialogoActualizarTareaComponent;
  let fixture: ComponentFixture<DialogoActualizarTareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoActualizarTareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoActualizarTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
