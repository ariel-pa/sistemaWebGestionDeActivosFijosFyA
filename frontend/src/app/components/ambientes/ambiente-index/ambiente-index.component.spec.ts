import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbienteIndexComponent } from './ambiente-index.component';

describe('AmbienteIndexComponent', () => {
  let component: AmbienteIndexComponent;
  let fixture: ComponentFixture<AmbienteIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmbienteIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmbienteIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
