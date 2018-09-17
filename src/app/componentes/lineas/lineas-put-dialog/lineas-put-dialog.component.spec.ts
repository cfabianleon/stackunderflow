import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineasPutDialogComponent } from './lineas-put-dialog.component';

describe('LineasPutDialogComponent', () => {
  let component: LineasPutDialogComponent;
  let fixture: ComponentFixture<LineasPutDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineasPutDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineasPutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
