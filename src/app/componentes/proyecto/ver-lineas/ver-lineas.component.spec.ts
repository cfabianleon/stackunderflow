import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerLineasComponent } from './ver-lineas.component';

describe('VerLineasComponent', () => {
  let component: VerLineasComponent;
  let fixture: ComponentFixture<VerLineasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerLineasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerLineasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
