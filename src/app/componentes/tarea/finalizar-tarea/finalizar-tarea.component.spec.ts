import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarTareaComponent } from './finalizar-tarea.component';

describe('FinalizarTareaComponent', () => {
  let component: FinalizarTareaComponent;
  let fixture: ComponentFixture<FinalizarTareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizarTareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizarTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
