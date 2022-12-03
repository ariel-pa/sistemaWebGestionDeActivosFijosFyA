import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdificioIndexComponent } from './edificio-index.component';

describe('EdificioIndexComponent', () => {
  let component: EdificioIndexComponent;
  let fixture: ComponentFixture<EdificioIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdificioIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdificioIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
