import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BakupIndexComponent } from './bakup-index.component';

describe('BakupIndexComponent', () => {
  let component: BakupIndexComponent;
  let fixture: ComponentFixture<BakupIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BakupIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BakupIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
