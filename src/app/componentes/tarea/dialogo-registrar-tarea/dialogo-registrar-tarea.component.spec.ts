import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoRegistrarTareaComponent } from './dialogo-registrar-tarea.component';

describe('DialogoRegistrarTareaComponent', () => {
  let component: DialogoRegistrarTareaComponent;
  let fixture: ComponentFixture<DialogoRegistrarTareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoRegistrarTareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoRegistrarTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
