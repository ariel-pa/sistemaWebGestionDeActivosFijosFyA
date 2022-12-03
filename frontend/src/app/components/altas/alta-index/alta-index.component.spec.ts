import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaIndexComponent } from './alta-index.component';

describe('AltaIndexComponent', () => {
  let component: AltaIndexComponent;
  let fixture: ComponentFixture<AltaIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
