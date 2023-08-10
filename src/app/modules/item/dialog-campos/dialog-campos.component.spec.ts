import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCamposComponent } from './dialog-campos.component';

describe('DialogCamposComponent', () => {
  let component: DialogCamposComponent;
  let fixture: ComponentFixture<DialogCamposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCamposComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCamposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
