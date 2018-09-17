import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoTareaEjecucionAddButtonComponent } from './dialogo-tarea-ejecucion-add-button.component';

describe('DialogoTareaEjecucionAddButtonComponent', () => {
  let component: DialogoTareaEjecucionAddButtonComponent;
  let fixture: ComponentFixture<DialogoTareaEjecucionAddButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoTareaEjecucionAddButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoTareaEjecucionAddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
