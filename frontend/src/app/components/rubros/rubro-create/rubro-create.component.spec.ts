import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubroCreateComponent } from './rubro-create.component';

describe('RubroCreateComponent', () => {
  let component: RubroCreateComponent;
  let fixture: ComponentFixture<RubroCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RubroCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RubroCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
