import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoDescripcionComponent } from './dialogo-descripcion.component';

describe('DialogoDescripcionComponent', () => {
  let component: DialogoDescripcionComponent;
  let fixture: ComponentFixture<DialogoDescripcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoDescripcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoDescripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
