import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoPutRecursoComponent } from './dialogo-put-recurso.component';

describe('DialogoPutRecursoComponent', () => {
  let component: DialogoPutRecursoComponent;
  let fixture: ComponentFixture<DialogoPutRecursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoPutRecursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoPutRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
