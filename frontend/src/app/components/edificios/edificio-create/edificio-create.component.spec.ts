import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdificioCreateComponent } from './edificio-create.component';

describe('EdificioCreateComponent', () => {
  let component: EdificioCreateComponent;
  let fixture: ComponentFixture<EdificioCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdificioCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdificioCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
