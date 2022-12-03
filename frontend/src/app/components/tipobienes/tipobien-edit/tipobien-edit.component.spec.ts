import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipobienEditComponent } from './tipobien-edit.component';

describe('TipobienEditComponent', () => {
  let component: TipobienEditComponent;
  let fixture: ComponentFixture<TipobienEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipobienEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipobienEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
