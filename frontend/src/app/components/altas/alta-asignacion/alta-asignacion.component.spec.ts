import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaAsignacionComponent } from './alta-asignacion.component';

describe('AltaAsignacionComponent', () => {
  let component: AltaAsignacionComponent;
  let fixture: ComponentFixture<AltaAsignacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaAsignacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaAsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
