import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivoEditComponent } from './activo-edit.component';

describe('ActivoEditComponent', () => {
  let component: ActivoEditComponent;
  let fixture: ComponentFixture<ActivoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivoEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
