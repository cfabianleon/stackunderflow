import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineasPutComponent } from './lineas-put.component';

describe('LineasPutComponent', () => {
  let component: LineasPutComponent;
  let fixture: ComponentFixture<LineasPutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineasPutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineasPutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
