import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaDetalleComponent } from './alta-detalle.component';

describe('AltaDetalleComponent', () => {
  let component: AltaDetalleComponent;
  let fixture: ComponentFixture<AltaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
