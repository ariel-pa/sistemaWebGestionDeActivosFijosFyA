import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipobienCreateComponent } from './tipobien-create.component';

describe('TipobienCreateComponent', () => {
  let component: TipobienCreateComponent;
  let fixture: ComponentFixture<TipobienCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipobienCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipobienCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
