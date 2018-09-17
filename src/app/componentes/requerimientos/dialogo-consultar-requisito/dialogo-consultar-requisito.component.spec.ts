import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoConsultarRequisitoComponent } from './dialogo-consultar-requisito.component';

describe('DialogoConsultarRequisitoComponent', () => {
  let component: DialogoConsultarRequisitoComponent;
  let fixture: ComponentFixture<DialogoConsultarRequisitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoConsultarRequisitoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoConsultarRequisitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
