import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesPostDialogComponent } from './clientes-post-dialog.component';

describe('ClientesPostDialogComponent', () => {
  let component: ClientesPostDialogComponent;
  let fixture: ComponentFixture<ClientesPostDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesPostDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesPostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
