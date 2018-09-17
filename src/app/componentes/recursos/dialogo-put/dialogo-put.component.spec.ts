import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoPutComponent } from './dialogo-put.component';

describe('DialogoPutComponent', () => {
  let component: DialogoPutComponent;
  let fixture: ComponentFixture<DialogoPutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoPutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoPutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
