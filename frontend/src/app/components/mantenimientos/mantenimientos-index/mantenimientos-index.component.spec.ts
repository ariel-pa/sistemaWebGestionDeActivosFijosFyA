import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientosIndexComponent } from './mantenimientos-index.component';

describe('MantenimientosIndexComponent', () => {
  let component: MantenimientosIndexComponent;
  let fixture: ComponentFixture<MantenimientosIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenimientosIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenimientosIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
