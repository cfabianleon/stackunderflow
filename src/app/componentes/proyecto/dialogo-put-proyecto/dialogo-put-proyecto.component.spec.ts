import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoPutProyectoComponent } from './dialogo-put-proyecto.component';

describe('DialogoPutProyectoComponent', () => {
  let component: DialogoPutProyectoComponent;
  let fixture: ComponentFixture<DialogoPutProyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoPutProyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoPutProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
