import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubroEditComponent } from './rubro-edit.component';

describe('RubroEditComponent', () => {
  let component: RubroEditComponent;
  let fixture: ComponentFixture<RubroEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RubroEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RubroEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
