import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoCrearEjecucionComponent } from './dialogo-crear-ejecucion.component';

describe('DialogoCrearEjecucionComponent', () => {
  let component: DialogoCrearEjecucionComponent;
  let fixture: ComponentFixture<DialogoCrearEjecucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoCrearEjecucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoCrearEjecucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
