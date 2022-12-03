import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoCreatComponent } from './empleado-creat.component';

describe('EmpleadoCreatComponent', () => {
  let component: EmpleadoCreatComponent;
  let fixture: ComponentFixture<EmpleadoCreatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadoCreatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadoCreatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
