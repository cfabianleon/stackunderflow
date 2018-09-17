import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineasPostDialogComponent } from './lineas-post-dialog.component';

describe('LineasPostDialogComponent', () => {
  let component: LineasPostDialogComponent;
  let fixture: ComponentFixture<LineasPostDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineasPostDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineasPostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
