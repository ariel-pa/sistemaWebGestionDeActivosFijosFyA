import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaIndexComponent } from './baja-index.component';

describe('BajaIndexComponent', () => {
  let component: BajaIndexComponent;
  let fixture: ComponentFixture<BajaIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BajaIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BajaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
