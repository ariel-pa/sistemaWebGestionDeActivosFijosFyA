import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbienteCreateComponent } from './ambiente-create.component';

describe('AmbienteCreateComponent', () => {
  let component: AmbienteCreateComponent;
  let fixture: ComponentFixture<AmbienteCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmbienteCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmbienteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
