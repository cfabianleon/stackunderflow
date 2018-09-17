import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoActualizarComponent } from './dialogo-actualizar.component';

describe('DialogoActualizarComponent', () => {
  let component: DialogoActualizarComponent;
  let fixture: ComponentFixture<DialogoActualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoActualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoActualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
