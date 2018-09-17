import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoPostProyectoComponent } from './dialogo-post-proyecto.component';

describe('DialogoPostProyectoComponent', () => {
  let component: DialogoPostProyectoComponent;
  let fixture: ComponentFixture<DialogoPostProyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoPostProyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoPostProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
