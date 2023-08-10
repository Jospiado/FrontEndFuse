import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesItemComponent } from './detalhes-item.component';

describe('DetalhesItemComponent', () => {
  let component: DetalhesItemComponent;
  let fixture: ComponentFixture<DetalhesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
