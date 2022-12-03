import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbienteEditComponent } from './ambiente-edit.component';

describe('AmbienteEditComponent', () => {
  let component: AmbienteEditComponent;
  let fixture: ComponentFixture<AmbienteEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmbienteEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmbienteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
