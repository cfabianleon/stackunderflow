import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoTareaEjecucionButtonComponent } from './dialogo-tarea-ejecucion-button.component';

describe('DialogoTareaEjecucionButtonComponent', () => {
  let component: DialogoTareaEjecucionButtonComponent;
  let fixture: ComponentFixture<DialogoTareaEjecucionButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoTareaEjecucionButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoTareaEjecucionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
