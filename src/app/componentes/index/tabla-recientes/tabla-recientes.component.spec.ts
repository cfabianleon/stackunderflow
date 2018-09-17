import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaRecientesComponent } from './tabla-recientes.component';

describe('TablaRecientesComponent', () => {
  let component: TablaRecientesComponent;
  let fixture: ComponentFixture<TablaRecientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaRecientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaRecientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
