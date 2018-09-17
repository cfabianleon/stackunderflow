import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaListarComponent } from './tabla-listar.component';

describe('TablaListarComponent', () => {
  let component: TablaListarComponent;
  let fixture: ComponentFixture<TablaListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
