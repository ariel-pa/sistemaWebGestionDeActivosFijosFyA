import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaCreateComponent } from './alta-create.component';

describe('AltaCreateComponent', () => {
  let component: AltaCreateComponent;
  let fixture: ComponentFixture<AltaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
