import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesPutDialogComponent } from './clientes-put-dialog.component';

describe('ClientesPutDialogComponent', () => {
  let component: ClientesPutDialogComponent;
  let fixture: ComponentFixture<ClientesPutDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesPutDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesPutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
