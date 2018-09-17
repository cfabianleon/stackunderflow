import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoAddEjecucionComponent } from './dialogo-add-ejecucion.component';

describe('DialogoAddEjecucionComponent', () => {
  let component: DialogoAddEjecucionComponent;
  let fixture: ComponentFixture<DialogoAddEjecucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoAddEjecucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoAddEjecucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
