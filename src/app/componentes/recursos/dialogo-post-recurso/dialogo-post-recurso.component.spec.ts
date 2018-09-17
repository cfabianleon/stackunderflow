import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoPostRecursoComponent } from './dialogo-post-recurso.component';

describe('DialogoPostRecursoComponent', () => {
  let component: DialogoPostRecursoComponent;
  let fixture: ComponentFixture<DialogoPostRecursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoPostRecursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoPostRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
