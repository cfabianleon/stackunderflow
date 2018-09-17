import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerLineasDialogComponent } from './ver-lineas-dialog.component';

describe('VerLineasDialogComponent', () => {
  let component: VerLineasDialogComponent;
  let fixture: ComponentFixture<VerLineasDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerLineasDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerLineasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
