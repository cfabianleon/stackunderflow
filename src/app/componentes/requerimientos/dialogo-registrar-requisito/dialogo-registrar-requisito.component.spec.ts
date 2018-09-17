import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoRegistrarRequisitoComponent } from './dialogo-registrar-requisito.component';

describe('DialogoRegistrarRequisitoComponent', () => {
  let component: DialogoRegistrarRequisitoComponent;
  let fixture: ComponentFixture<DialogoRegistrarRequisitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoRegistrarRequisitoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoRegistrarRequisitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
