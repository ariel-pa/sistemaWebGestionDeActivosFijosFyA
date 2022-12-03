import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepreciacionIndexComponent } from './depreciacion-index.component';

describe('DepreciacionIndexComponent', () => {
  let component: DepreciacionIndexComponent;
  let fixture: ComponentFixture<DepreciacionIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepreciacionIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepreciacionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
