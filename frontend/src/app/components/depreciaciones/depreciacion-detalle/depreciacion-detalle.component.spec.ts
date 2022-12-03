import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepreciacionDetalleComponent } from './depreciacion-detalle.component';

describe('DepreciacionDetalleComponent', () => {
  let component: DepreciacionDetalleComponent;
  let fixture: ComponentFixture<DepreciacionDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepreciacionDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepreciacionDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
