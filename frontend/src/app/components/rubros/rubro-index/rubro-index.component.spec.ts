import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubroIndexComponent } from './rubro-index.component';

describe('RubroIndexComponent', () => {
  let component: RubroIndexComponent;
  let fixture: ComponentFixture<RubroIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RubroIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RubroIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
