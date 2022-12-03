import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipobienIndexComponent } from './tipobien-index.component';

describe('TipobienIndexComponent', () => {
  let component: TipobienIndexComponent;
  let fixture: ComponentFixture<TipobienIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipobienIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipobienIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
