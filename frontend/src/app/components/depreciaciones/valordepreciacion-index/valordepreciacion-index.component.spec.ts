import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValordepreciacionIndexComponent } from './valordepreciacion-index.component';

describe('ValordepreciacionIndexComponent', () => {
  let component: ValordepreciacionIndexComponent;
  let fixture: ComponentFixture<ValordepreciacionIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValordepreciacionIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValordepreciacionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
