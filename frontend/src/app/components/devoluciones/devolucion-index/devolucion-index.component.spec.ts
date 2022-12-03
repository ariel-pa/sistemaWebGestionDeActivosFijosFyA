import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucionIndexComponent } from './devolucion-index.component';

describe('DevolucionIndexComponent', () => {
  let component: DevolucionIndexComponent;
  let fixture: ComponentFixture<DevolucionIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevolucionIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevolucionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
