import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoTareaEjecucionComponent } from './dialogo-tarea-ejecucion.component';

describe('DialogoTareaEjecucionComponent', () => {
  let component: DialogoTareaEjecucionComponent;
  let fixture: ComponentFixture<DialogoTareaEjecucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoTareaEjecucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoTareaEjecucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
